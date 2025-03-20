import { useState, useEffect } from "react";
import { fetchWeatherForecast } from "../services/WeatherService";

function useWeather(defaultCity = "Lyon") {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getWeather = async (city) => {
    try {
      setLoading(true);
      const result = await fetchWeatherForecast(city);
      setData(result);
      setError(null);
      // Save city to localStorage when weather fetch succeeds
      localStorage.setItem("lastCity", city);
    } catch (err) {
      setError(err.message);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Try to get last searched city from localStorage
    const savedCity = localStorage.getItem("lastCity");
    getWeather(savedCity || defaultCity);
  }, [defaultCity]);

  return { data, loading, error, getWeather };
}

export default useWeather;
