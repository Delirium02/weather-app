import "./style.css";

const tempUnitSelector = document.querySelector(".unit-selector");
const getWeatherBtn = document.querySelector(".get-weather-btn");
const weatherInfo = document.querySelector(".weather-info");

// Initially hide weather info section
weatherInfo.classList.remove("weather-info");

let currentWeatherData = null;

async function fetchWeatherData(location) {
	const response = await fetch(
		`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=RX4APM5AGNAJYPE3LWW7AT5KD`,
	);
	const weatherData = await response.json();

	return weatherData;
}

function toCelsius(f) {
	return ((f - 32) * 5) / 9;
}

function processData(weatherData) {
	return {
		locationAddress: weatherData.address,
		conditions: weatherData.currentConditions.conditions,
		temperature: weatherData.currentConditions.temp,
		icon: weatherData.currentConditions.icon,
	};
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

async function displayData() {
	const locationInput = document.querySelector(".location-input").value;
	if (!locationInput) return;

	const rawData = await fetchWeatherData(locationInput);
	currentWeatherData = processData(rawData);

	renderWeatherData();
}

async function renderWeatherData() {
	if (!currentWeatherData) return;
	const { locationAddress, conditions, temperature, icon } = currentWeatherData;

	let displayTemp;
	let unit;

	if (tempUnitSelector.value === "Celsius") {
		displayTemp = toCelsius(temperature).toFixed(0);
		unit = "°C";
	} else {
		displayTemp = temperature.toFixed(0);
		unit = "°F";
	}

	const iconUrl = await getIcon(icon);

	weatherInfo.innerHTML = `<h2>${locationAddress.charAt(0).toUpperCase() + locationAddress.slice(1)}</h2>
							<div class="weather-conditions">
								${iconUrl ? `<img src="${iconUrl}" alt="${icon}" class="weather-icon">` : ""}
								<p>Conditions: ${conditions}</p>
							</div>
							<p class="temperature-display">Current Temperature: ${displayTemp}${unit}</p>`;

	weatherInfo.classList.add("weather-info");
	weatherInfo.classList.remove("display-none");
}

// Get Weather Button Event Listener
getWeatherBtn.addEventListener("click", (e) => {
	e.preventDefault();

	displayData();
});

tempUnitSelector.addEventListener("change", () => {
	renderWeatherData();
});
