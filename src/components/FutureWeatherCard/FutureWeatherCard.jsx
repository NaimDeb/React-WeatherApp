import React, { useState } from "react";
import "./FutureWeatherCard.css";


function FutureWeatherCard({ forecast, onDaySelect }) {


  const days = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];

  const today = new Date().getDay();  

  // Get today and the next days
  const forecastDays = ["Aujourd'hui"].concat(days.slice(today, today + 3));

  // Transform the days into an associative array day => YYYY-MM-DD 
  const forecastDates = forecastDays.reduce((acc, day, index) => {
    const date = new Date(Date.now() + index * 24 * 60 * 60 * 1000);
    return { ...acc, [day]: date.toISOString().slice(0, 10) };
  }, {});


  const [selected, setSelected] = useState("Aujourd'hui");


  function handleSelectDay(day) {
    setSelected(day);
    onDaySelect(forecastDates[day]);
  }

return (
  <div className="card-action">
    {forecastDays.map((day) => {
      const dayForecast = forecast && Array.isArray(forecast.forecastday)
        ? forecast.forecastday.find((f) => f.date === forecastDates[day])
        : null;
      
      return (
        <a href="#" key={day} onClick={(e) => {e.preventDefault(); handleSelectDay(day)}} className={selected === day ? "bold" : ""}>
          <div>
            <span className="day-name">{day}</span>
            <div className="day-temp">{dayForecast?.day?.avgtemp_c}°</div>
            <img
              src={dayForecast?.day?.condition?.icon}
              alt={`Weather for ${day}`}
              className="day-icon"
            />
          </div>
        </a>
      );
    })}
  </div>
);
}

export default FutureWeatherCard;
