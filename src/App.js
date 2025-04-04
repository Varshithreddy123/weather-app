import React, { useState } from 'react';
import Header from './components/Header/Header';
import SearchBar from "./SearchBar/SearchBar";
import WeatherList from './WeatherList/WeatherList';
import Footer from './Footer/Footer';
import { getWeatherForecast } from "./services/weatherService";
import './App.css';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [lastSearchedCity, setLastSearchedCity] = useState('');

  const handleSearch = async (city) => {
    if (!city.trim()) {
      setError('Please enter a city name');
      return;
    }

    setLoading(true);
    setError('');
    setLastSearchedCity(city);
    
    try {
      const data = await getWeatherForecast(city);
      setWeatherData(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch weather data. Please try again.');
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    if (lastSearchedCity) {
      handleSearch(lastSearchedCity);
    }
  };

  return (
    <div className="App">
      <Header />
      <div className="container">
        <SearchBar onSearch={handleSearch} />
        {error && (
          <div className="error-message">
            {error}
            {lastSearchedCity && (
              <button onClick={handleRetry} className="retry-button">
                Retry
              </button>
            )}
          </div>
        )}
        <WeatherList 
          weatherData={weatherData} 
          loading={loading} 
          error={error}
          location={weatherData?.location} 
        />
      </div>
      <Footer />
    </div>
  );
}

export default App;