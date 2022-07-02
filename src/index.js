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
    "Sunday"
  ];
  let day = days[now.getDay()];
  let min = now.getMinutes();
  if (min < 10) {
    min = `0${now.getMinutes()}`;
  }
  let time = `${day} ${now.getHours()}:${min}`;
  return time;
  s;
}

function cityName(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input");
  let cityN = city.value;
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityN}&units=metric&appid=${apiKey}`;
  console.log(apiURL);
  let cityH = document.querySelector("h1");
  cityH.innerHTML = `${city.value}`;
  axios.get(`${apiURL}`).then(showTemperature);
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
  console.log(response.data);
  let temp = Math.round(response.data.main.temp);
  console.log(temp);
  let humidity = response.data.main.humidity;
  let wind = Math.round(response.data.wind.speed);
  let feels = Math.round(response.data.main.feels_like);
  let pressure = response.data.main.pressure;
  let weather = response.data.weather[0].main;

  let citiH = document.querySelector("h1");
  citiH.innerHTML = `${response.data.name}`;

  let tempHead = document.querySelector("#temperature");
  tempHead.innerHTML = `${temp}`;

  let weatherH = document.querySelector("#weather");
  weatherH.innerHTML = `${weather}`;

  let characteristics = document.querySelector("ul");
  characteristics.innerHTML = `<li>Humidity ${humidity}%</li> <li>Wind ${wind} km/h</li>
  <li>Pressure ${pressure}hPa</li>`;
  let feel = document.querySelector("#feels");
  feel.innerHTML = `
  Feels like ${feels}°`;
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

let formCity = document.querySelector("form");
formCity.addEventListener("submit", cityName);

let button = document.querySelector("#current");
button.addEventListener("click", findCity);
