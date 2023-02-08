// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the wind speed
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city

var today = dayjs();
var apiKey = "e474eaacc96b11909564331f7b9f7855"
var searchBtnEl = document.querySelector('.btn')
var todayContainer = document.querySelector('#today');
var forecastContainer = document.querySelector('#forecast');



var curNameEl = document.getElementById('name');
var curIconEl = document.getElementById('icon');
var curTempEl = document.getElementById('Temp');
var curHumEl = document.getElementById('Humidity');
var curWindEl = document.getElementById('Wind');
var searchCity = document.querySelector('input');


function fetchCoords(search) {
        var geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${search}&appid=${apiKey}`
        fetch(geoUrl)
    .then(function(response) {
        return response.json()})
        .then(function(data) {
            fetchWeather(data[0]);
        })   
    }

function fetchWeather(location) {
        console.log("location",location);
        var lat = location.lat;
        var lon = location.lon;
        var city = location.name;
        var lonLatUrl= `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;
        fetch(lonLatUrl)
    .then(function(response) {
        return response.json()})
        .then(function(data) {
            renderItems(data,city);
        })

    }

function renderItems(data,city) {
        console.log(data);
        // render current weather 
        renderCurrentWeather(data.list[0],city)
        // render 5 day weather 
        renderForecast(data.list)
    }
    
function renderCurrentWeather(weather,city) {
        // get date
        var date = dayjs().format('M/D/YYYY');

        console.log("w",weather);
        // get wind,temp,humidity, icon url 
        var tempF = weather.main.temp
        var wind = weather.wind.speed
        var humidity = weather.main.humidity
        var iconUrl = `http://openweathermap.org/img/w/${weather.weather[0].icon}.png`

        var card = document.createElement('div');
        var cardBody = document.createElement('div');
        var heading = document.createElement('h2');
        var weatherIcon = document.createElement('img');
        var tempEl = document.createElement('p');
        var windEl = document.createElement('p');
        var humidityEl = document.createElement('p');
      
        card.setAttribute('class', 'card');
        cardBody.setAttribute('class', 'card-body');
        card.append(cardBody);
      
        heading.setAttribute('class', 'h3 card-title');
        tempEl.setAttribute('class', 'card-text');
        windEl.setAttribute('class', 'card-text');
        humidityEl.setAttribute('class', 'card-text');
        heading.setAttribute('class', 'h3 card-title');
        tempEl.setAttribute('class', 'card-text');
        windEl.setAttribute('class', 'card-text');
        humidityEl.setAttribute('class', 'card-text');

        heading.textContent = `${city} (${date})`;
        weatherIcon.setAttribute('src', iconUrl);
        // weatherIcon.setAttribute('alt', iconDescription);
        weatherIcon.setAttribute('class', 'weather-img');
        heading.append(weatherIcon);
        tempEl.textContent = `Temp: ${tempF}°F`;
        windEl.textContent = `Wind: ${wind} MPH`;
        humidityEl.textContent = `Humidity: ${humidity} %`;
        cardBody.append(heading, tempEl, windEl, humidityEl);

        todayContainer.innerHTML = '';
        todayContainer.append(card);

    }

    // Function to display 5 day forecast.
function renderForecast(dailyForecast) {
    // Create unix timestamps for start and end of 5 day forecast
    var startDt = dayjs().add(1, 'day').startOf('day').unix();
    var endDt = dayjs().add(5, 'day').startOf('day').unix();
    console.log(startDt);
    console.log(endDt);
    
  
    var headingCol = document.createElement('div');
    var heading = document.createElement('h4');
  
    headingCol.setAttribute('class', 'col-12');
    heading.textContent = '5-Day Forecast:';
    headingCol.append(heading);
  
    forecastContainer.innerHTML = '';
    forecastContainer.append(headingCol);
  
    for (var i = 0; i < dailyForecast.length; i++) {
  // First filters through all of the data and returns only data that falls between one day after the current data and up to 5 days later.
  if (dailyForecast[i].dt >= startDt && dailyForecast[i].dt < endDt) {

    // Then filters through the data and returns only data captured at noon for each day.
    if (dailyForecast[i].dt_txt.slice(11, 13) == "12") {
      // call function renderForcastCard, it will look similar to renderCurrentWeather
        // renderForecastCard(dailyForecast[i]);
    }
  }
}
}


// getWeather();
function handleSearchFormSubmit(e) {
    // Don't continue if there is nothing in the search form
    if (!searchCity.value) {
      return;
    }
  
    e.preventDefault();
    var search = searchCity.value.trim();
    fetchCoords(search);
    searchCity.value = '';
  }
  


searchBtnEl.addEventListener('click', handleSearchFormSubmit);

// set localStorage to input (text)

