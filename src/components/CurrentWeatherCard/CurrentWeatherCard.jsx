import React from "react";
import "./CurrentWeatherCard.css";

function CurrentWeatherCard({ name, weather }) {
  const condition = weather.condition;
  const temp = weather.temp_c || weather.avgtemp_c;
  const wind = weather.wind_kph || weather.maxwind_kph;

  return (
    <div className="card-content white-text" style={{ background: "#0b0829" }}>
      <span className="card-title">{name}</span>
      <p>
        <img src={condition.icon} alt="weather icon" />
      </p>
      <span className="temperature">{temp}°C</span>
      <div className="wind">Vent {wind}km/h</div>
    </div>
  );
}

export default CurrentWeatherCard;
