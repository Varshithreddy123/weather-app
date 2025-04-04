import React from 'react';
import './WeatherCard.css';
import { WiDaySunny, WiRain, WiCloudy, WiSnow, WiThunderstorm, WiFog } from 'react-icons/wi';

const WeatherCard = ({ weather }) => {
  const getWeatherIcon = (main) => {
    switch (main) {
      case 'Clear': return <WiDaySunny size={50} />;
      case 'Rain': return <WiRain size={50} />;
      case 'Clouds': return <WiCloudy size={50} />;
      case 'Snow': return <WiSnow size={50} />;
      case 'Thunderstorm': return <WiThunderstorm size={50} />;
      case 'Mist':
      case 'Fog':
      case 'Haze': return <WiFog size={50} />;
      default: return <WiDaySunny size={50} />;
    }
  };

  return (
    <div className="weather-card">
      <h3>{new Date(weather.dt * 1000).toLocaleDateString()}</h3>
      <div className="weather-icon">{getWeatherIcon(weather.weather[0].main)}</div>
      <div className="weather-details">
        <p>Temp: {Math.round(weather.temp.day)}°C</p>
        <p>Feels like: {Math.round(weather.feels_like.day)}°C</p>
        <p>Humidity: {weather.humidity}%</p>
        <p>Wind: {weather.wind_speed} m/s</p>
      </div>
      <p className="weather-description">{weather.weather[0].description}</p>
    </div>
  );
};

export default WeatherCard;