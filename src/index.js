let now = new Date();
let apiKey = "df2db07229e49d3cee5cd0ac55a20dc7";

function formatTime(now) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let min = now.getMinutes();
  if (min < 10) {
    min = `0${now.getMinutes()}`;
  }
  let time = `${day} ${now.getHours()}:${min}`;
  return time;
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  // let days = [
  //   "Sunday",
  //   "Monday",
  //   "Tuesday",
  //   "Wednesday",
  //   "Thursday",
  //   "Friday",
  //   "Saturday",
  // ];
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  console.log(forecast);

  forecast.forEach(function (forecastDay, index) {
    if (index < 7 && index > 0) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
          <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div> 
              <img src="http://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
              }.png" alt="" width="50">
          <div class="weather-forecast-temperatures">
            <span class="weather-forecast-temperature=max">${Math.round(
              forecastDay.temp.max
            )}&deg;</span>
            <span class="weather-forecast-temperature=min">${Math.round(
              forecastDay.temp.min
            )}&deg;</span>
          </div>
        </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function search(city) {
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  console.log(apiURL);
  axios.get(`${apiURL}`).then(showTemperature);
}
function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

console.log(formatTime(now));
let timeNow = document.querySelector("h2");
timeNow.innerHTML = `${formatTime(now)}`;

function showForecast(coords) {
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.lon}&units=metric&appid=${apiKey}`;
  axios.get(apiURL).then(displayForecast);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  console.log(temperatureElement);
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemp * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemp);
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
}

function findCity() {
  navigator.geolocation.getCurrentPosition(handlePosition);
}

function handlePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  console.log(lat);
  console.log(lon);
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  console.log(apiURL);
  axios.get(`${apiURL}`).then(showTemperature);
}

function showTemperature(response) {
  let Temp = Math.round(response.data.main.temp);
  let humidity = response.data.main.humidity;
  let wind = Math.round(response.data.wind.speed);
  let feels = Math.round(response.data.main.feels_like);
  let pressure = response.data.main.pressure;
  let weather = response.data.weather[0].description;
  console.log(weather);

  celsiusTemp = response.data.main.temp;

  let citiH = document.querySelector("h1");
  let tempHead = document.querySelector("#temperature");
  let weatherH = document.querySelector("#weather");
  let characteristics = document.querySelector("ul");
  let feel = document.querySelector("#feels");
  let iconElemen = document.querySelector("#icon");
  let e = document.querySelector("#change");

  citiH.innerHTML = `${response.data.name}`;
  tempHead.innerHTML = `${Temp}`;
  iconElemen.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElemen.setAttribute("alt", `${weather}`);
  weatherH.innerHTML = `${weather}`;
  characteristics.innerHTML = `<li>Humidity ${humidity}%</li> <li>Wind ${wind} km/h</li>
  <li>Pressure ${pressure}hPa</li>`;
  feel.innerHTML = `Feels like ${feels}°`;
  displayCelsiusTemperature(event);
  showForecast(response.data.coord);
}

let celsiusTemp = null;
search("Kyiv");

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

let form = document.querySelector("form");
form.addEventListener("submit", handleSubmit);

let button = document.querySelector("#current");
button.addEventListener("click", findCity);
