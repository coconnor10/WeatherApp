//openweather api key
var apiKey = "21f58254cbacc25156eb3c918cfa89ed";

//variables
var savedCityList = [];
var searchButton = document.getElementById("search-btn");
var searchResults = document.getElementById("search-results");
var fiveDayForecast = document.getElementById("forecast");
var searchBar = document.getElementById("search-bar");
var cityName = document.querySelector(".city-name");
var temp = document.querySelector(".temperature");
var desc = document.querySelector(".description");
var humid = document.querySelector(".humid");
var wind = document.querySelector(".wind");
var currentDate = moment().format("MM/DD/YYYY");
var savedCity = localStorage.getItem("cities");
var searchAside = document.getElementById("search-aside");
var uvIndex = document.querySelector(".uv-index");
var forecastHead = document.getElementById("forecast-head");

//function to get weather for one day
function getWeather() {
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      searchBar.value +
      "&appid=" +
      apiKey
  )
    .then((response) => response.json())
    .then((data) => {
      var latitudeVal = data["coord"]["lat"];
      var longitudeVal = data["coord"]["lon"];

      // display city name and date
      var cityNameValue = data["name"];
      cityName.innerHTML = cityNameValue + " (" + currentDate + ")";

      fetch(
        "https://api.openweathermap.org/data/2.5/onecall?lat=" +
          latitudeVal +
          "&lon=" +
          longitudeVal +
          "&exclude=minutely,hourly&appid=" +
          apiKey
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);

          var tempValue = data["current"]["temp"];
          var humidValue = data["current"]["humidity"];
          var windValue = data["current"]["wind_speed"];
          var uvIndexValue = data["current"]["uvi"];

          //remove 'hide' class to show results
          searchResults.classList.remove("hide");
          fiveDayForecast.classList.remove("hide");
          forecastHead.classList.remove("hide");

          //create elements for results

          temp.innerHTML = "Temp: " + tempValue;
          wind.innerHTML = "Wind: " + windValue;
          humid.innerHTML = "Humidity: " + humidValue;
          uvIndex.innerHTML = "UV Index: " + uvIndexValue;

          // five day forecast cards
          for (i = 0; i < 5; i++) {
            var forecastCardEl = document.createElement("div");
            var forecastDateEl = document.createElement("h2");
            var forecastTempEl = document.createElement("p");
            var forecastWindEl = document.createElement("p");
            var forecastHumidEl = document.createElement("p");

            var forecastDateVal = currentDate + 1;
            var forecastTempVal = data["daily"][i]["temp"]["min"];
            var forecastWindVal = data["daily"][i]["wind_speed"];
            var forecastHumidVal = data["daily"][i]["humidity"];

            forecastCardEl.classList.add("card");

            fiveDayForecast.appendChild(forecastCardEl);
            forecastCardEl.appendChild(forecastDateEl);
            forecastCardEl.appendChild(forecastTempEl);
            forecastCardEl.appendChild(forecastWindEl);
            forecastCardEl.appendChild(forecastHumidEl);

            forecastHumidEl.innerHTML = "Humidity: " + forecastHumidVal;
            forecastWindEl.innerHTML = "Wind: " + forecastWindVal;
            forecastTempEl.innerHTML = "Temp: " + forecastTempVal;
            forecastDateEl.innerHTML = forecastDateVal;
            console.log(forecastDateVal);
          }
        });
    });
}

function clearForecast() {
  document.getElementById(fiveDayForecast).textContent = clear;
}

searchButton.addEventListener("click", getWeather);
