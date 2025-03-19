import React, { useState } from "react";

function FutureWeatherCard() {


  const days = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];

  const today = new Date().getDay();

  
  const forecastDays = ["Aujourd'hui"].concat(days.slice(today, today + 3));

  
  const [selected, setSelected] = useState("Aujourd'hui");


  function handleSelectDay(day) {
    setSelected(day);
    
  }

  return (
    <div className="card-action">
      {forecastDays.map((day) => 

        <a href="#" key={day} onClick={() => handleSelectDay(day)} className={selected === day && "bold"}>{day}</a>
        
      )}
    </div>
  );
}

export default FutureWeatherCard;
