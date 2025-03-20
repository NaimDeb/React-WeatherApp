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
    } catch (err) {
      setError(err.message);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getWeather(defaultCity);
  }, [defaultCity]);

  return { data, loading, error, getWeather };
}

export default useWeather;