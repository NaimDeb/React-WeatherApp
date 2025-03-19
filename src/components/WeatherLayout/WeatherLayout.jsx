import React, { useEffect, useState } from "react";
import FutureWeatherCard from "../FutureWeatherCard";
import CurrentWeatherCard from "../CurrentWeatherCard";
import './WeatherLayout.css';

function WeatherLayout() {

  const url = "https://api.weatherapi.com/v1/forecast.json?key=";
  const api_key = import.meta.env.VITE_WEATHER_API_KEY;
  let search = "Lyon"
  let nbOfDays = 3;



  const [apiData,setApiData] = useState([]);

  const [loading, setLoading] = useState(true);


  useEffect(() => {

    fetch(`${url}${api_key}&q=${search}&days=${nbOfDays}&aqi=yes&alerts=no`)

      .then((response) => {

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }        
        return response.json();
      })
      .then((data) => {
        
        setLoading(false);
        setApiData(data);
        

      })

      .catch(error => 
        {
          console.log(error)
          setLoading(false);
        })
      

  })


    


  return (
    <div className="row">
      <div className="col s12 m6 push-m3">
        <div className="weather card blue-grey darken-1">

          {loading && <div className="card-content white-text">Loading...</div>}

          {loading == false && <>
          <CurrentWeatherCard response={apiData} />
          <FutureWeatherCard response={apiData}/>
          </>
          }
          
        </div>
      </div>
    </div>
  );
}

export default WeatherLayout;
