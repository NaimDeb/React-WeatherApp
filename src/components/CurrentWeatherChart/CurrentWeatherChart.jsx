import React from 'react'
import Graph from '../Graph/Graph'

function CurrentWeatherChart( { forecast } ) {
  return (
    <div className='forecast-card'>    

        <Graph hourlyData={forecast.hour}/>
    
    </div>
  )
}

export default CurrentWeatherChart