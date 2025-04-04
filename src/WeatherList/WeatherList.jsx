import React, { useState, useEffect } from 'react';
import './WeatherList.css';

const WeatherList = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [historyData, setHistoryData] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [resolvedCity, setResolvedCity] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  
  const API_KEY = 'ed51e80b5c144cd0b69164309230307';

  // Fetch weather data
  const fetchWeatherData = async (query) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${encodeURIComponent(query)}&days=5&aqi=no&alerts=no`
      );

      if (!response.ok) throw new Error(`API Error: ${response.statusText}`);

      const data = await response.json();
      setResolvedCity(data.location.name);

      const transformedData = {
        city: data.location.name,
        country: data.location.country,
        updatedAt: new Date().toLocaleTimeString(),
        current: {
          temp: data.current.temp_c,
          feelsLike: data.current.feelslike_c,
          humidity: data.current.humidity,
          windSpeed: data.current.wind_kph,
          condition: data.current.condition.text,
          icon: data.current.condition.icon,
        },
        forecast: data.forecast.forecastday.map((day) => ({
          day: new Date(day.date).toLocaleDateString('en-US', { weekday: 'long' }),
          date: new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          high: day.day.maxtemp_c,
          low: day.day.mintemp_c,
          condition: day.day.condition.text,
          icon: day.day.condition.icon,
        })),
      };

      setWeatherData(transformedData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch search/autocomplete results
  const fetchSearchResults = async (query) => {
    if (!query) return setSearchResults([]);
    
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${encodeURIComponent(query)}`
      );

      if (!response.ok) throw new Error(`Search API Error: ${response.statusText}`);

      const data = await response.json();
      setSearchResults(data);
    } catch (err) {
      console.error('Search error:', err);
    }
  };

  // Fetch weather history
  const fetchWeatherHistory = async () => {
    if (!selectedDate) return;

    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/history.json?key=${API_KEY}&q=${resolvedCity}&dt=${selectedDate}`
      );

      if (!response.ok) throw new Error(`History API Error: ${response.statusText}`);

      const data = await response.json();
      setHistoryData(data.forecast.forecastday[0]);
    } catch (err) {
      console.error('History fetch error:', err);
    }
  };

  // Get user's current location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchWeatherData(`${latitude},${longitude}`);
      },
      (err) => {
        console.error('Location error:', err);
        setResolvedCity('London');
        fetchWeatherData('London'); // Default to London if geolocation fails
      }
    );

    const interval = setInterval(() => {
      fetchWeatherData(resolvedCity);
    }, 300000); // Refresh every 5 minutes

    return () => clearInterval(interval);
  }, []);

  if (loading) return <p>Loading weather data...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="weather-list">
      <h2>{weatherData.city}, {weatherData.country}</h2>
      <p>Last Updated: {weatherData.updatedAt}</p>

      <div className="current-weather">
        <div>
          <p>{weatherData.current.condition}</p>
          <p>Temperature: {Math.round(weatherData.current.temp)}°C</p>
          <p>Feels Like: {Math.round(weatherData.current.feelsLike)}°C</p>
          <p>Humidity: {weatherData.current.humidity}%</p>
          <p>Wind Speed: {weatherData.current.windSpeed} km/h</p>
        </div>
        <img src={weatherData.current.icon} alt={weatherData.current.condition} />
      </div>

      <h3>5-Day Forecast</h3>
      <div className="forecast-list">
        {weatherData.forecast.map((day, index) => (
          <div key={index}>
            <p>{day.day}, {day.date}</p>
            <img src={day.icon} alt={day.condition} />
            <p>{day.condition}</p>
            <p>High: {Math.round(day.high)}°C</p>
            <p>Low: {Math.round(day.low)}°C</p>
          </div>
        ))}
      </div>

      <h3>Search a City</h3>
      <input
        type="text"
        placeholder="Search city..."
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          fetchSearchResults(e.target.value);
        }}
      />
      <ul>
        {searchResults.map((result, index) => (
          <li key={index} onClick={() => fetchWeatherData(result.name)}>
            {result.name}, {result.country}
          </li>
        ))}
      </ul>

      <h3>Check Weather History</h3>
      <input
        type="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
      />
      <button onClick={fetchWeatherHistory}>Get History</button>

      {historyData && (
        <div className="history-weather">
          <h4>Weather on {selectedDate}</h4>
          <p>Max Temp: {Math.round(historyData.day.maxtemp_c)}°C</p>
          <p>Min Temp: {Math.round(historyData.day.mintemp_c)}°C</p>
          <p>Condition: {historyData.day.condition.text}</p>
          <img src={historyData.day.condition.icon} alt={historyData.day.condition.text} />
        </div>
      )}
    </div>
  );
};

export default WeatherList;
