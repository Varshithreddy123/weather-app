import axios from "axios";

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const BASE_URL = "https://api.weatherapi.com/v1";

export const getWeatherForecast = async (city) => {
  try {
    const response = await axios.get(`${BASE_URL}/forecast.json`, {
      params: {
        key: API_KEY,  // Corrected from 'appid' to 'key'
        q: city,
        days: 5,       // Corrected from 'cnt' to 'days'
        aqi: "no",
        alerts: "no",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching weather data:", error.response?.data || error.message);
    throw new Error(error.response?.data?.error?.message || "Failed to fetch weather data");
  }
};
