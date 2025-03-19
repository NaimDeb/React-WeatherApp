import React, { useState } from "react";
// Marche pas ?
import "./Searchbar.css";
import { fetchWeatherName } from "../../services/WeatherService";

function Searchbar() {
  const [searchData, setSearchData] = useState(null);

  const handleSearch = async (city) => {
    if (city.length < 3) {
      if (searchData.length == 0) {
        setSearchData(null);
      }
      return;
    }
    const data = await fetchWeatherName(city);
    setSearchData(data);

    // Debouncing
  };

  const handleSelectSearch = (city) => {
    setSearchData(null);
    document.querySelector(".searchBar").value = city;
  };

  return (
    <div>
      <p>Rechercher une ville</p>
      <form action="#" method="get">
        <input
          type="text"
          className="searchBar"
          onKeyUp={(e) => handleSearch(e.target.value)}
        />
        {searchData &&
          searchData.map((city) => (
            <button
            className="searchResult"
              onClick={(event) => {
                event.preventDefault();
                handleSelectSearch(city.name);
              }}
              key={`${city.name}${city.country}`}
            >
              {city.name}, {city.country}
            </button>
          ))}
        <br></br>
        <button type="submit">Rechercher</button>
      </form>
    </div>
  );
}

export default Searchbar;
