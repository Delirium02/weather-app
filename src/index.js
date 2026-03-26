import "./style.css";

const getWeatherBtn = document.querySelector(".get-weather-btn");
const weatherInfo = document.querySelector(".weather-info");

async function fetchWeatherData(location) {
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=RX4APM5AGNAJYPE3LWW7AT5KD`);
    const weatherData = await response.json();

    console.log(weatherData);
    return weatherData;
}

function toCelsius(f) {
    return (f - 32) * 5/9;
}

function toFahrenheit(c) {
    return (c * 9/5) + 32;
}

function processData(weatherData) {
    const currentConditions = weatherData.currentConditions;
    const dailyForecasts = weatherData.days;
    const temp = currentConditions.temp;
}

// Get Weather Button Event Listener

getWeatherBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    const locationInput = document.querySelector(".location-input").value;
    const rawData = await fetchWeatherData(locationInput);
    processData(rawData);

    const locationAddress = rawData.address;
    const currentTempC = toCelsius(rawData.currentConditions.temp);
    

    weatherInfo.innerHTML = `<h2>${locationAddress.charAt(0).toUpperCase() + locationAddress.slice(1)}</h2>
<p>Current Temperature: ${currentTempC}°C</p>
<p>Conditions: ${rawData.currentConditions.conditions}</p>
`;

    weatherInfo.classList.remove("display-none");
})


// fetchWeatherData("melbourne").then(processData);