let now = new Date();
let weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let weekday = weekdays[now.getDay()];
let today = document.querySelector("#today");
today.innerHTML = `${weekday}`;
let currentDay = now.getDate();
let months = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
];
let currentMonth = months[now.getMonth()];
let currentYear = now.getFullYear();
let currentDate = document.querySelector("#currentDate");
currentDate.innerHTML = `${currentDay}.${currentMonth}.${currentYear}`;
let currentHour = now.getHours();
if (currentHour < 10) {
  currentHour = `0${currentHour}`;
}
let currentMin = now.getMinutes();
if (currentMin < 10) {
  currentMin = `0${currentMin}`;
}
let currentTime = document.querySelector("#currentTime");
currentTime.innerHTML = `${currentHour}:${currentMin}`;
function showTemp(response) {
  let temp = Math.round(response.data.main.temp);
  let h4 = document.querySelector("h4");
  h4.innerHTML = `${temp}°C`;
  let h1 = document.querySelector("h1");
  h1.innerHTML = response.data.name;
  let weather = document.querySelector("#mood");
  weather.innerHTML = response.data.weather[0].description;
  let windSpeed = Math.round(response.data.wind.speed);
  let wind = document.querySelector("#windSpeed");
  wind.innerHTML = ` ${windSpeed} km/h `;
}
function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-text-input");

  let units = "metric";
  let apiKey = "c85bec28379fe50c898d7cf523259179";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemp);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

function celsiusTemp(event) {
  event.preventDefault();
  let h4 = document.querySelector("h4");
  h4.innerHTML = `${tempMax} °C`;
}
function fahrenheitTemp(event) {
  event.preventDefault();
  let h4 = document.querySelector("h4");
  let mathFahrenheit = tempMax * 1.8 + 32;
  h4.innerHTML = `${mathFahrenheit} °F`;
}
let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", celsiusTemp);
let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", fahrenheitTemp);
let tempMax = 10;

function showCurrentTemp(response) {
  let currentTemp = Math.round(response.data.main.temp);
  let currentTempElement = document.querySelector("h4");
  currentTempElement.innerHTML = `${currentTemp}°C`;
  let currentCity = response.data.name;
  let currentCityElement = document.querySelector("h1");
  currentCityElement.innerHTML = currentCity;
  console.log(response);
  let weather = document.querySelector("#mood");
  weather.innerHTML = response.data.weather[0].description;
  let windSpeed = Math.round(response.data.wind.speed);
  let wind = document.querySelector("#windSpeed");
  wind.innerHTML = ` ${windSpeed} km/h `;
}
function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "c85bec28379fe50c898d7cf523259179";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showCurrentTemp);
}
function currentLocation() {
  navigator.geolocation.getCurrentPosition(showPosition);
}
let button = document.querySelector("button");
button.addEventListener("click", currentLocation);
