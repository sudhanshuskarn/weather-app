// src/components/MapComponent.js
import { useEffect, useRef } from 'react';
import L from 'leaflet';  // Import Leaflet library for the map
import 'leaflet/dist/leaflet.css';  // Don't forget to import the Leaflet CSS

const MapComponent = ({ weather }) => {
  const mapRef = useRef(null);  // Reference to hold the map instance
  const markerRef = useRef(null);  // Reference for the marker to update it when location changes

  useEffect(() => {
    if (weather && weather.coord) {
      const { lat, lon } = weather.coord; // Get latitude and longitude from the weather data

      // Initialize map only if it hasn't been initialized yet
      if (!mapRef.current) {
        const map = L.map('weather-map').setView([lat, lon], 10); // Set map center based on coordinates
        mapRef.current = map;  // Store the map instance in the ref

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);
      } else {
        // If map already exists, just update its center to the new coordinates
        mapRef.current.setView([lat, lon], 10);
      }

      // Create a string with all weather details for the popup
      const weatherDetails = `
        <b>Weather Information</b><br>
        <b>Location:</b> ${weather.name}, ${weather.sys.country}<br>
        <b>Temperature:</b> ${weather.main.temp}°C<br>
        <b>Humidity:</b> ${weather.main.humidity}%<br>
        <b>Pressure:</b> ${weather.main.pressure} hPa<br>
        <b>Wind Speed:</b> ${weather.wind.speed} m/s<br>
        <b>Wind Direction:</b> ${weather.wind.deg}°<br>
      `;

      // If marker already exists, update its position and popup
      if (markerRef.current) {
        markerRef.current.setLatLng([lat, lon]); // Update marker position
        markerRef.current.setPopupContent(weatherDetails); // Update popup content
      } else {
        // Create a new marker and bind the weather details to it
        markerRef.current = L.marker([lat, lon])
          .addTo(mapRef.current)
          .bindPopup(weatherDetails)
          .openPopup();
      }
    }
  }, [weather]); // Only re-run the effect when weather data changes

  return <div id="weather-map" style={{ height: '400px' }}></div>;
};

export default MapComponent;

