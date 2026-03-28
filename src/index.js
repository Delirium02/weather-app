import "./style.css";

const getWeatherBtn = document.querySelector(".get-weather-btn");
const weatherInfo = document.querySelector(".weather-info");


// Initially hide weather info section
weatherInfo.classList.remove("weather-info");

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

async function getIcon(iconName) {
    try {
        const image = await import(`./images/weather-icons/${iconName}.svg`);
        return image.default;
    } catch {
        console.log(`Icon not found: ${iconName}`);
        return null;
    }
}

// Get Weather Button Event Listener
getWeatherBtn.addEventListener("click", async (e) => {
    e.preventDefault();

    const locationInput = document.querySelector(".location-input").value;   
    const rawData = await fetchWeatherData(locationInput);
    processData(rawData);

    const locationAddress = rawData.address;
    const conditions = rawData.currentConditions.conditions;
    const currentTempC = toCelsius(rawData.currentConditions.temp);

    const iconName = rawData.currentConditions.icon;
    const iconUrl = await getIcon(iconName);
    

    weatherInfo.innerHTML = `<h2>${locationAddress.charAt(0).toUpperCase() + locationAddress.slice(1)}</h2>
                            <div class="weather-conditions">
                                ${iconUrl ? `<img src="${iconUrl}" alt="${iconName}" class="weather-icon">` : ""}
                                <p>Conditions: ${conditions}</p>
                            </div>
                            <p class="temperature-display">Current Temperature: ${currentTempC.toFixed(0)}°C</p>`;


    weatherInfo.classList.add("weather-info");
    weatherInfo.classList.remove("display-none");
});