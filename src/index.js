import "./style.css";

const tempUnitSelector = document.querySelector(".unit-selector");
const getWeatherBtn = document.querySelector(".get-weather-btn");
const weatherInfo = document.querySelector(".weather-info");

// Initially hide weather info section
weatherInfo.classList.remove("weather-info");

async function fetchWeatherData(location) {
	const response = await fetch(
		`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=RX4APM5AGNAJYPE3LWW7AT5KD`,
	);
	const weatherData = await response.json();

	console.log(weatherData);
	return weatherData;
}

function toCelsius(f) {
	return ((f - 32) * 5) / 9;
}

function toFahrenheit(c) {
	return (c * 9) / 5 + 32;
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

	const rawData = await fetchWeatherData(locationInput);
	const cleanData = processData(rawData);

	const locationAddress = cleanData.locationAddress;
	const conditions = cleanData.conditions;
	let temperature;
	let unit;

	if (tempUnitSelector.value === "Celsius") {
		temperature = toCelsius(cleanData.temperature).toFixed(0);
		unit = "°C";
	} else {
		temperature = cleanData.temperature.toFixed(0);
		unit = "°F";
	}

	const icon = cleanData.icon;
	const iconUrl = await getIcon(icon);

	weatherInfo.innerHTML = `<h2>${locationAddress.charAt(0).toUpperCase() + locationAddress.slice(1)}</h2>
							<div class="weather-conditions">
								${iconUrl ? `<img src="${iconUrl}" alt="${icon}" class="weather-icon">` : ""}
								<p>Conditions: ${conditions}</p>
							</div>
							<p class="temperature-display">Current Temperature: ${temperature}${unit}</p>`;
};

function renderWeatherData() {
	
}

// Get Weather Button Event Listener
getWeatherBtn.addEventListener("click", (e) => {
	e.preventDefault();

	displayData();

	weatherInfo.classList.add("weather-info");
	weatherInfo.classList.remove("display-none");
});

function changeTempUnit() {
	tempUnitSelector.addEventListener("change", () => {
		displayData();
	});
}

changeTempUnit();

