// src/pages/api/weather.js

import getWeatherData from '@/lib/weather';

const API_KEY = process.env.OPENWEATHERMAP_API_KEY;

let requestCount = 0;
let lastRequestTime = Date.now();

export default async function handler(req, res) {
  const currentTime = Date.now();

  // Reset request count every minute
  if (currentTime - lastRequestTime > 60 * 1000) {
    requestCount = 0;
    lastRequestTime = currentTime;
  }

  // Handle rate-limiting: Allow only 59 requests per minute
  if (requestCount >= 59) {
    const remainingTime = Math.ceil((60 * 1000 - (currentTime - lastRequestTime)) / 1000);
    return res.status(429).json({ error: `Rate limit exceeded. Try again in ${remainingTime} seconds.` });
  }

  requestCount++;

  try {
    const { location } = req.query;
    if (!location) {
      return res.status(400).json({ error: 'Location is required' });
    }

    const weatherData = await getWeatherData(location, API_KEY);
    
    // Return the weather data as a response
    res.status(200).json(weatherData);
  } catch (error) {
    console.error("Weather API Error: ", error);
    res.status(500).json({ error: error.message });
  }
}

