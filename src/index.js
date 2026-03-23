async function fetchWeatherData(location) {
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=RX4APM5AGNAJYPE3LWW7AT5KD`);
    const weatherData = await response.json();

    console.log(weatherData);
    return weatherData;
}


function processData(weatherData) {
    const currentConditions = weatherData.currentConditions;
    const dailyForecasts = weatherData.days;
    const temp = currentConditions.temp;

    console.log(`Current temperature: ${temp}°C`);
}

fetchWeatherData("melbourne").then(processData);