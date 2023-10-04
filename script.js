const apiKey = '1d9d62ac9684ac5f4f6d51631cc28327';
const searchForm = document.getElementById('search-form');
const cityInput = document.getElementById('city-input');
const currentWeather = document.getElementById('current-weather');
const forecast = document.getElementById('forecast');
const historyList = document.getElementById('history-list');

let searchHistory = [];

async function getWeatherData(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
        const data = await response.json();

        currentWeather.innerHTML = `
            <h2>Current Weather in ${city}</h2>
            <p>Temperature: ${Math.round(data.main.temp - 273.15)}°C</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Wind: ${data.wind.speed} M/S</h4>
            <p>Weather: ${data.weather[0].description}</p>
        `;

        
        fetchWeather(city);
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

function addToHistory(city) {
    if (!searchHistory.includes(city)) {
        searchHistory.push(city);

        const listItem = document.createElement('li');
        listItem.textContent = city;

        listItem.addEventListener('click', () => {
            cityInput.value = city;
            searchWeather(city);
        });

        historyList.appendChild(listItem);
    }
}

function fetchWeather(city) {
    try {
        const apiUrl = `https://api.openweathermap.org/forecast?q=${city}&appid=${apiKey}`;
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const forecastSection = document.getElementById('forecast');
                forecastSection.innerHTML = '';

                
                data.list.forEach(forecast => {
                    const forecastItem = document.createElement('div');
                    const date = new Date(forecast.dt * 1000); 
                    forecastItem.textContent = `Date: ${date.toLocaleDateString()}, Temperature: ${Math.round(forecast.main.temp - 273.15)}°C, Wind: ${forecast.wind.speed} M/S, Conditions: ${forecast.weather[0].description}`;
                    forecastSection.appendChild(forecastItem);
                });
            })
            .catch(error => {
                console.error('Error fetching forecast data:', error);
            });
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

function searchWeather(city) {
    getWeatherData(city);
    addToHistory(city);
    cityInput.value = '';
}

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const city = cityInput.value.trim();
    if (city) {
        searchWeather(city);
    }
});


searchWeather('New York'); 