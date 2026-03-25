import "./style.css";

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




// fetchWeatherData("melbourne").then(processData);