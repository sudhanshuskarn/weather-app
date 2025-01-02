import React from 'react';
import { FaTemperatureHigh, FaTachometerAlt, FaCloudSun, FaTint, FaWind, FaCloud, FaSun, FaMoon } from 'react-icons/fa';
import { GiCompass, GiSunrise, GiSunset } from 'react-icons/gi';

export default function WeatherCard({ weather }) {
  const { main, weather: weatherDetails, wind, clouds, sys, coord, name } = weather;

  const temp = main?.temp;
  const humidity = main?.humidity;
  const description = weatherDetails?.[0]?.description || "No description available";
  const windSpeed = wind?.speed;
  const cloudCoverage = clouds?.all;
  const visibility = weather?.visibility;
  const sunrise = sys?.sunrise;
  const sunset = sys?.sunset;
  const lat = coord?.lat;
  const lon = coord?.lon;

  // Convert sunrise and sunset timestamps to readable time
  const formatTime = (timestamp) => {
    if (!timestamp) return 'N/A';
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString();
  };

  return (
    <div className="bg-white shadow-lg p-6 rounded-lg max-w-md mx-auto border border-gray-300 sm:max-w-lg md:max-w-xl lg:max-w-2xl">
      <h3 className="text-2xl font-bold text-center text-gray-800 mb-4">Weather Details</h3>

      <p className="text-center text-lg text-gray-600 mb-4">Location: <strong>{name}</strong></p>

      <div className="text-center mb-6">
        <p className="text-lg text-gray-700">
          <FaCloudSun className="inline-block text-yellow-500 mr-2" />
          {description}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2">
        <div className="flex items-center justify-start">
          <FaTemperatureHigh className="text-red-500 text-2xl mr-2" />
          <p className="text-lg font-medium text-gray-700">Temperature: <strong>{temp ? `${temp.toFixed(1)} °C` : 'N/A'}</strong></p>
        </div>
        <div className="flex items-center justify-start">
          <FaTint className="text-blue-500 text-2xl mr-2" />
          <p className="text-lg font-medium text-gray-700">Humidity: <strong>{humidity ? `${humidity}%` : 'N/A'}</strong></p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2">
        <div className="flex items-center justify-start">
          <FaWind className="text-teal-500 text-2xl mr-2" />
          <p className="text-lg font-medium text-gray-700">Wind Speed: <strong>{windSpeed ? `${windSpeed} m/s` : 'N/A'}</strong></p>
        </div>
        <div className="flex items-center justify-start">
          <FaCloud className="text-gray-500 text-2xl mr-2" />
          <p className="text-lg font-medium text-gray-700">Cloud Coverage: <strong>{cloudCoverage ? `${cloudCoverage}%` : 'N/A'}</strong></p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2">
        <div className="flex items-center justify-start">
          <GiCompass className="text-indigo-500 text-2xl mr-2" />
          <p className="text-lg font-medium text-gray-700">Coordinates: <strong>{lat}, {lon}</strong></p>
        </div>
        <div className="flex items-center justify-start">
          <FaCloud className="text-gray-400 text-2xl mr-2" />
          <p className="text-lg font-medium text-gray-700">Visibility: <strong>{visibility ? `${visibility / 1000} km` : 'N/A'}</strong></p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2">
        <div className="flex items-center justify-start">
          <GiSunrise className="text-orange-500 text-2xl mr-2" />
          <p className="text-lg font-medium text-gray-700">Sunrise: <strong>{formatTime(sunrise)}</strong></p>
        </div>
        <div className="flex items-center justify-start">
          <GiSunset className="text-purple-500 text-2xl mr-2" />
          <p className="text-lg font-medium text-gray-700">Sunset: <strong>{formatTime(sunset)}</strong></p>
        </div>
      </div>

      <div className="text-center mt-4">
        <p className="text-lg text-gray-700">
          <FaTachometerAlt className="inline-block text-green-500 mr-2" />
          Atmospheric Pressure: <strong>{main?.pressure ? `${main.pressure} hPa` : 'N/A'}</strong>
        </p>
      </div>
    </div>
  );
}

