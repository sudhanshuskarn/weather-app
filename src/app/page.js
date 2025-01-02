'use client';  // Mark this as a client-side component

import { useState, useEffect } from 'react';
import WeatherCard from '@/components/WeatherCard';
import LocationInput from '@/components/LocationInput';

export default function HomePage() {
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState(""); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [invalidLocation, setInvalidLocation] = useState(false); // Track invalid location

  // Function to fetch weather based on location
  const fetchWeather = async (location) => {
    if (!location) return; // Skip fetching if location is empty

    setInvalidLocation(false); // Reset invalid location flag when fetching starts
    setLoading(true); // Start loading

    try {
      const response = await fetch(`/api/weather?location=${location}`); // Server-side API route for weather
      const data = await response.json();

      if (response.ok) {
        setWeather(data); // Store weather data in the state
        setLoading(false);
      } else {
        throw new Error(data.error || 'Failed to fetch weather data');
      }
    } catch (err) {
      setError("Failed to fetch weather data");
      setLoading(false);
      setInvalidLocation(true); // Set invalid location flag
    }
  };

  // Fetch default location when the page loads
  useEffect(() => {
  const fetchLocation = async () => {
    try {
      // First attempt to fetch location from ipinfo.io directly on the client-side
      const response = await fetch('https://ipinfo.io/json');

      if (!response.ok) {
        // If the client-side fetch fails (likely due to CORS), fall back to server-side
        throw new Error('CORS issue, falling back to server-side');
      }

      const data = await response.json();
      setLocation(data.city || 'Delhi');
      setLoading(false);
    } catch (clientError) {
      // If there's a CORS issue or other error, make a request to the server-side API route
      setError('Failed to fetch location from client. Trying server-side...');
      setLoading(true);
      try {
        const serverResponse = await fetch('/api/location');  // Server-side fallback
        const serverData = await serverResponse.json();
        setLocation(serverData.location || 'Unknown location');
        setLoading(false);
      } catch (serverError) {
        setError('Failed to fetch location from server');
        setLoading(false);
      }
    }
  };

  fetchLocation();  // Call the function to fetch location when the component mounts
}, []);  // Empty dependency array to run only once when the page loads

  // Fetch weather when location is available
  useEffect(() => {
    if (location) {
      fetchWeather(location); // Only fetch weather after the location is set
    }
  }, [location]); // This effect runs when the location state changes

  return (
    <section className="container mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold text-center mb-6">Weather Today</h2>

      {/* Location input */}
      <LocationInput 
        setLocation={setLocation} 
        setInvalidLocation={setInvalidLocation}
        setError={setError} // Pass setError to reset error message
      />

      {/* Display error message if invalid location is entered */}
      {invalidLocation && (
        <div className="bg-red-100 text-red-600 p-4 rounded-lg shadow-md text-center text-sm md:text-base mt-4 max-w-xs mx-auto">
          "Entered wrong location or location not available, try with correct or different location."
        </div>
      )}

      {/* Display weather info or loading state */}
      {loading ? (
        <div className="text-center text-lg">Loading weather data...</div>
      ) : error ? (
        <div className="text-center text-lg text-red-500">{error}</div>
      ) : (
        weather && <WeatherCard weather={weather} />
      )}
    </section>
  );
}

