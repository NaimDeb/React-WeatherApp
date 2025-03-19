import React from 'react'

function CurrentWeatherCard( { response }) {



  if (!response) {
    return <div className="card-content white-text">Loading...</div>
  }


  return (
    <div className="card-content white-text">
        <span className="card-title">{response.location.name}</span>
        <p><img src={response.current.condition.icon}/></p>
        <span className="temperature">{response.current.temp_c}°C</span>
        <div className="wind">Vent {response.current.wind_kph}km/h ({response.current.wind_degree}°)</div>
    </div>
  )
}

export default CurrentWeatherCard