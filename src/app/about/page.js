// src/app/about/page.js
export default function AboutPage() {
  return (
    <section className="container mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold text-center mb-6">About</h2>
      <p className="text-lg">
        Welcome to the Weather App! This app provides current weather data, and more. You can check the weather for any location and see detailed information about temperature, humidity, weather conditions, and more.
      </p>
      <p className="mt-4">
        This app uses the OpenWeatherMap API to fetch the latest weather data. The free plan allows up to 60 API calls per minute.
      </p>
    </section>
  );
}

