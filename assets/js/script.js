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
var requestUrl= "https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid= apiKey";
var apiKey = "e474eaacc96b11909564331f7b9f7855"
document.getElementById('date').textContent = dayjs().format('(M/D/YYYY)');

function getApi(requestUrl) {
    fetch(requestUrl).then(function (response){
        console.log(response.status);
    }) 
    .then(function(data) {
        console.log(data);
    });
};




// PSUDOCODING

// fectch call 1 (user will enter a city name)
    // returns Lat/Lon
        // fetch call 2 (takes in Lat/Lon)
            // returns Weather data
                // fetch call 3 (takes in icon id)
                    // returns the actual image 
// break these out into functions 

