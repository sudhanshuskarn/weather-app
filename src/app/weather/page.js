'use client'; // Mark this as a client-side component

import { useState, useEffect } from 'react';
import LocationInput from '@/components/LocationInput';
import dynamic from 'next/dynamic';

// Dynamically import Leaflet to avoid SSR errors
const MapComponent = dynamic(() => import('@/components/MapComponent'), {
  ssr: false, // Disable server-side rendering for this component
});

export default function WeatherPage() {
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState("London"); // Default location
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [invalidLocation, setInvalidLocation] = useState(false); // Track invalid location

  // Function to fetch weather based on location
  const fetchWeather = async (location) => {
    setInvalidLocation(false); // Reset invalid location flag when fetching starts
    setLoading(true); // Start loading

    try {
      const response = await fetch(`/api/weather?location=${location}`);
      const data = await response.json();

      if (data.error) {
        setError(data.error);
        setInvalidLocation(true); // Set invalid location flag if location is invalid
        setLoading(false);
      } else {
        setWeather(data);
        setLoading(false);
      }
    } catch (err) {
      setError("Failed to fetch weather data");
      setLoading(false);
      setInvalidLocation(true); // Set invalid location flag in case of error
    }
  };

  // Fetch weather when location changes
  useEffect(() => {
    fetchWeather(location);
  }, [location]);

  return (
    <section className="container mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold text-center mb-6">Weather Today</h2>

      {/* Location input */}
      <LocationInput setLocation={setLocation} setInvalidLocation={setInvalidLocation} setError={setError} />

      {/* Display error message for invalid location */}
      {invalidLocation && (
        <div className="bg-red-100 text-red-600 p-4 rounded-lg shadow-md text-center text-sm md:text-base mt-4 max-w-xs mx-auto">
          Entered wrong location, try with correct location.
        </div>
      )}

      {/* Map container */}
      <div style={{ height: '400px', marginBottom: '20px' }}>
        {weather && <MapComponent weather={weather} />}
      </div>

      {/* Display loading or error state */}
      {loading ? (
        <div className="text-center text-lg">Loading weather data...</div>
      ) : error ? (
        <div className="text-center text-lg text-red-500">{error}</div>
      ) : (
        weather && (
          <div className="text-center text-lg">
            <p>Temperature: {weather.main.temp}°C</p>
            <p>Humidity: {weather.main.humidity}%</p>
            {/* Add more weather details as needed */}
          </div>
        )
      )}
    </section>
  );
}

