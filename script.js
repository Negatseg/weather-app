    const apiKey = '1d9d62ac9684ac5f4f6d51631cc28327';
    const searchForm = document.getElementById('search-form');
    const cityInput = document.getElementById('city-input');
    const currentWeather = document.getElementById('current-weather');
    const forecast = document.getElementById('forecast');
    const historyList = document.getElementById('history-list');
    
    let searchHistory = [];
    
    // Function to fetch weather data
    async function getWeatherData(city) {
        try {
            // Make an API request to get weather data for the city
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
            const data = await response.json();
    
            // Display the current weather data
            currentWeather.innerHTML = `
                <h2>Current Weather in ${city}</h2>
                <p>Temperature: ${Math.round(data.main.temp - 273.15)}°C</p>
                <p>Humidity: ${data.main.humidity}%</p>
                <p>Weather: ${data.weather[0].description}</p>
            `;
    
            // Fetch forecast data or any other relevant data here and display it in the 'forecast' section
            const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}/forecast';

            // Fetch forecast data from the API
            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    // Assuming the data contains an array of forecasts
                    const forecastSection = document.getElementById('forecast');
                    forecastSection.innerHTML = ''; // Clear previous data
    
                    // Iterate through the forecast data and display it
                    data.forEach(forecast => {
                        const forecastItem = document.createElement('div');
                        forecastItem.textContent = `Date: ${forecast.date}, Temperature: ${forecast.temperature}, Conditions: ${forecast.conditions}`;
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
    
    // Function to add a city to the search history
    function addToHistory(city) {
        // Check if the city is already in the history
        if (!searchHistory.includes(city)) {
            searchHistory.push(city);
            // Create a list item for the search history
            const listItem = document.createElement('li');
            listItem.textContent = city;
            // Add click event to search with the city again when clicked
            listItem.addEventListener('click', () => {
                cityInput.value = city;
                searchWeather(city);
            });
            // Add the list item to the history list
            historyList.appendChild(listItem);
        }
    }
    
    // Function to search for weather data when the form is submitted
    function searchWeather(city) {
        getWeatherData(city);
        addToHistory(city);
        cityInput.value = ''; // Clear the input field
    }
    
    // Event listener for the form submission
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const city = cityInput.value.trim();
        if (city) {
            searchWeather(city);
        }
    });
    
    // Initialize the application with some default city, e.g., your current location
    searchWeather('New York');
    
    
    