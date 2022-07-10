let celsiusTemperature = 20;
let now = new Date();
let apiKey = "df2db07229e49d3cee5cd0ac55a20dc7";

function formatTime(now) {
  let days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  let day = days[now.getDay()];
  let min = now.getMinutes();
  if (min < 10) {
    min = `0${now.getMinutes()}`;
  }
  let time = `${day} ${now.getHours()}:${min}`;
  return time;
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

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
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
  let temp = Math.round(response.data.main.temp);
  let humidity = response.data.main.humidity;
  let wind = Math.round(response.data.wind.speed);
  let feels = Math.round(response.data.main.feels_like);
  let pressure = response.data.main.pressure;
  let weather = response.data.weather[0].description;
  console.log(weather);

  let citiH = document.querySelector("h1");
  let tempHead = document.querySelector("#temperature");
  let weatherH = document.querySelector("#weather");
  let characteristics = document.querySelector("ul");
  let feel = document.querySelector("#feels");
  let iconElemen = document.querySelector("#icon");

  citiH.innerHTML = `${response.data.name}`;
  iconElemen.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElemen.setAttribute("alt", `${weather}`);
  tempHead.innerHTML = `${temp}`;
  weatherH.innerHTML = `${weather}`;
  characteristics.innerHTML = `<li>Humidity ${humidity}%</li> <li>Wind ${wind} km/h</li>
  <li>Pressure ${pressure}hPa</li>`;
  feel.innerHTML = `Feels like ${feels}°`;
}

search("Kyiv");

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

let form = document.querySelector("form");
form.addEventListener("submit", handleSubmit);

let button = document.querySelector("#current");
button.addEventListener("click", findCity);
