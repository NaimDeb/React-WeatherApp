import React from 'react'

function CurrentWeatherCard( { name, weather }) {

  


  return (
    <div className="card-content white-text">
        <span className="card-title">{name}</span>
        <p><img src={weather.condition.icon}/></p>
        <span className="temperature">{weather.temp_c}°C</span>
        <div className="wind">Vent {weather.wind_kph}km/h ({weather.wind_degree}°)</div>
    </div>
  )
}

export default CurrentWeatherCard