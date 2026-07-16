// Select all HTML elements

const cityName = document.getElementById("cityName");
const search = document.getElementById("searchBtn");
const errorHandle = document.getElementById("error");
const img = document.getElementById("weatherIcon");
const city = document.getElementById("city");
const temperature = document.getElementById("temperature");
const sky = document.getElementById("sky");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const dataContainer = document.querySelector(".data");
const loading = document.getElementById("loading");
const container = document.querySelector(".container");
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");

// API key
const apiKey = "ffad1c6daf5e23e5a5fbe73d7fdc26ab";

// Fetch weather data
function getWeather(){
    // Get city name from input
    const cityValue = cityName.value;

    // Check empty input
    if(cityValue.trim() === ""){
        errorHandle.textContent = "Please enter a city name...";
        return;
    }
    // Clear previous error
    errorHandle.textContent = "";

    // Show loading message
    loading.textContent = "Loading...";

    // Fetch weather API
fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`)

// Convert response to JSON
.then((response) => {
// Handle API response
    return response.json();
})
.then((data) => {
    search.disabled = false;

    // Hide loading
    loading.textContent = "";

if(data.cod === "404") {
    errorHandle.textContent = "❌ City not found";
    dataContainer.style.display = "none";
    return;
}

// Convert sunrise and sunset timestamp
const sunriseTime = new Date(data.sys.sunrise * 1000);
const sunriseText = sunriseTime.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit"
});

const sunsetTime = new Date(data.sys.sunset * 1000);

const sunsetText = sunsetTime.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit"
});

// Display sunrise and sunset
sunrise.textContent = `🌅 Sunrise:  ${sunriseText}`;
sunset.textContent = `🌇 Sunset: ${sunsetText}`;

// Display city name
city.textContent = data.name;

// Display temperature
temperature.textContent = "🌡️ Temperature: " + data.main.temp.toFixed(1) + "°C";

// Display humidity
humidity.textContent = "💧 Humidity: " + data.main.humidity + "%" ;

// Display wind speed
wind.textContent = "🌬️ Wind: " + data.wind.speed + " m/s";

// Display weather condition
sky.textContent = "☁️ Sky: " + data.weather[0].main;

// Change background based on weather
const weatherType = data.weather[0].main;
if(weatherType === "Clear") {
     container.style.background = "linear-gradient(to bottom, skyblue, lightblue)";
}
else if(weatherType === "Clouds"){
    container.style.background = "linear-gradient(to bottom, lightgray, darkgray)";
}
else if(weatherType === "Rain"){
    container.style.background = "linear-gradient(to bottom, darkblue, navy)";
}

// Clear input field
cityName.value = "";

// display weather icon
const icon = data.weather[0].icon;
img.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
dataContainer.style.display = "flex";

})

// Handle fetch error
.catch((error) => {
    console.log(error);
    loading.textContent = "";
    search.disabled = false;
});
}

// Search button click event
search.addEventListener("click", function(){
    search.disabled = true;
    getWeather();
});

// Search using Enter key
cityName.addEventListener("keydown", function(event){
    if(event.key === "Enter") {
        search.disabled = true;
        getWeather();
    }
});