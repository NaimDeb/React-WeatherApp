import React, { useEffect, useState } from "react";
import FutureWeatherCard from "../FutureWeatherCard/FutureWeatherCard";
import CurrentWeatherCard from "../CurrentWeatherCard";
import { fetchWeatherForecast } from '../../services/WeatherService';
import Searchbar from "../Searchbar/Searchbar";
import './WeatherLayout.css';

function WeatherLayout() {


  const [loading, setLoading] = useState(true);
  const [apiData,setApiData] = useState([]);
  const [error, setError] = useState(null);
  const [selectedWeather, setSelectedWeather] = useState(null);
  // const [searchData, setSearchData] = useState([]);

  const loadWeatherData = async (city = "Lyon") => {
    try {
        setLoading(true);
        const data = await fetchWeatherForecast(city);
        setApiData(data);
    } catch (error) {
        setError(error.message);
    } finally {
        setLoading(false);
    }
};

  useEffect(() => {
      loadWeatherData();
  }, []);


  
  const handleDaySelect = (date) => {
    const forecastDay = apiData.forecast.forecastday.find(day => day.date === date);
    setSelectedWeather(forecastDay?.day);
  };





  if (loading) return <div className="card-content white-text">Chargement...</div>;
  if (error) return <div className="card-content white-text">Erreur: {error}</div>;


  return (
    <div className="row">
      <div className="col s12 m6 push-m3">
      <Searchbar handleSelectCity={loadWeatherData} />
      
        <div className="weather card blue-grey darken-1">

          {loading == false && <>
          
          <CurrentWeatherCard name={apiData.location.name} weather={selectedWeather || apiData.current} />
          <FutureWeatherCard forecast={apiData.forecast} onDaySelect={handleDaySelect}/>
          </>
          }
          
        </div>
      </div>
    </div>
  );
}

export default WeatherLayout;
