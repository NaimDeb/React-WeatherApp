import React, { useCallback, useEffect, useState } from "react";
import FutureWeatherCard from "../FutureWeatherCard/FutureWeatherCard";
import CurrentWeatherCard from "../CurrentWeatherCard/CurrentWeatherCard";
import { fetchWeatherForecast } from "../../services/WeatherService";
import Searchbar from "../Searchbar/Searchbar";
import Graph from "../Graph/Graph";
import "./WeatherLayout.css";

function WeatherLayout() {
  const [loading, setLoading] = useState(true);
  const [apiData, setApiData] = useState(null);
  const [error, setError] = useState(null);
  const [selectedWeather, setSelectedWeather] = useState(null);
  const [selectedDayData, setSelectedDayData] = useState(null);

  const loadWeatherData = async (city = "Lyon") => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchWeatherForecast(city);
      setApiData(data);
    } catch (error) {
      setError(error.message);
      setApiData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWeatherData();
  }, []);

  const handleDaySelect = useCallback((date) => {
    const forecastDay = apiData.forecast.forecastday.find(
      (day) => day.date === date
    );
    setSelectedWeather(forecastDay?.day);
    setSelectedDayData(forecastDay);
  }, [apiData]);

return (
  <div className="row">
    <div className="col s12 m6 push-m3">
      <Searchbar handleSelectCity={loadWeatherData} />
      <div className="weather card blue-grey darken-1">
        {loading ? (
          <div className="card-content white-text">Chargement...</div>
        ) : error ? (
          <div className="card-content white-text">Erreur: {error}</div>
        ) : (
          <>
            <div className="future-weather-cards">
              <FutureWeatherCard
                forecast={apiData.forecast}
                onDaySelect={handleDaySelect}
              />
            </div>
            <div className="weather-content">
              <CurrentWeatherCard
                name={apiData.location.name}
                weather={selectedWeather || apiData.current}
                className="current-weather-card"
              />
              <Graph
                hourlyData={selectedDayData?.hour || apiData.forecast.forecastday[0].hour}
              />
            </div>
          </>
        )}
      </div>
    </div>
  </div>
);
}

export default WeatherLayout;
