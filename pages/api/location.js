// src/pages/api/location.js

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Logic to get location data, for example from ipinfo.io
      const response = await fetch('https://ipinfo.io/json'); // No API key needed for free tier
      const data = await response.json();

      // Extract city or fallback to a default value (e.g., "Delhi")
      const location = data.city || data.country || 'Delhi';

      // Send location back as JSON response
      res.status(200).json({ location });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch location data' });
    }
  } else {
    // Handle other HTTP methods, if needed (optional)
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}

