// src/lib/weather.js

let cache = {}; // Cache storage

const CACHE_DURATION = 15 * 60 * 1000; // Cache duration: 15 minutes

const getWeatherData = async (location, apiKey) => {
  const cachedData = cache[location];
  const currentTime = Date.now();

  // If cached data exists and is not expired
  if (cachedData && currentTime - cachedData.timestamp < CACHE_DURATION) {
    return cachedData.data; // Return cached data
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      // If response is not ok, throw an error with status text
      const errorText = await response.text();
      throw new Error(`Error fetching weather data: ${response.statusText}. ${errorText}`);
    }

    const data = await response.json();

    // Store the data in the cache with a timestamp
    cache[location] = {
      data,
      timestamp: currentTime,
    };

    return data;
  } catch (error) {
    throw new Error(`Failed to fetch weather data: ${error.message}`);
  }
};

export default getWeatherData;

