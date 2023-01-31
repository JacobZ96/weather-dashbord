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
var displayDate = dayjs().format('dddd MMM D, YYYY');

// var getApi= https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}

document.getElementById('currentDate').textContent = dayjs().format('dddd MMM D, YYYY');


// PSUDOCODING

// 4 cards displaying search, search history, current day weather, & 5-day forcast
    // connect weather API provided in readme 
        // get API key
    // 

    