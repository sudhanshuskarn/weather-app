'use client';

import { useState } from 'react';

export default function LocationInput({ setLocation, setInvalidLocation, setError }) {
  const [location, setInputLocation] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // State to handle error message

  const handleChange = (event) => {
    setInputLocation(event.target.value);
    setErrorMessage(''); // Clear the error message when the user starts typing
    setError(null); // Reset the error state on change
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (location.trim()) {
      // Reset the error message and invalid location flag on valid submit
      setErrorMessage('');
      setInvalidLocation(false);
      setError(null); // Clear the error message when user submits a valid location

      setLocation(location.trim()); // Pass the location to parent component
      setInputLocation(''); // Clear the input field
    } else {
      setErrorMessage('Please enter a valid/different location'); // Show error if location is empty
    }
  };

  return (
    <div className="mb-6">
      <form onSubmit={handleFormSubmit} className="flex justify-center">
        <input
          type="text"
          value={location}
          onChange={handleChange}
          placeholder="City or location"
          className="border p-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:ring-blue-300 sm:p-3 md:p-4 lg:p-5"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded-r-md hover:bg-blue-600">
          Search
        </button>
      </form>

      {/* Show error message if location is invalid */}
      {errorMessage && (
        <div className="bg-red-100 text-red-600 p-4 rounded-lg shadow-md text-center text-sm md:text-base mt-4 max-w-xs mx-auto">
          {errorMessage}
        </div>
      )}
    </div>
  );
}

