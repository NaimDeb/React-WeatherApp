import React, { useState } from "react";
// Marche pas ?
import "./Searchbar.css";
import { fetchWeatherName } from "../../services/WeatherService";

function Searchbar({ handleSelectCity }) {
  const [searchData, setSearchData] = useState(null);
  const [searchValue, setSearchValue] = useState("");

  const handleSearchNames = async (city) => {
    if (city.length < 3) {
      setSearchData(null);
      return;
    }
    const data = await fetchWeatherName(city);
    setSearchData(data);

    // Debouncing
  };

  const handleSelectSearch = (cityName) => {
    setSearchValue(cityName);
    setSearchData(null);
    handleSelectCity(cityName); // Pass the cityName to handleSelectCity
  };

  return (
    <div>
      <p>Rechercher une ville</p>
      <form>
        <input
          type="text"
          className="searchBar"
          value={searchValue} // Add this to control the input value
          onChange={(e) => {
            setSearchValue(e.target.value);
            handleSearchNames(e.target.value);
          }}
        />
        {searchData &&
          searchData.map((city) => (
            <button
              className="searchResult"
              onClick={(event) => {
                event.preventDefault();
                setSearchValue(city.name);
                handleSelectSearch(city.name);
              }}
              key={`${city.name}${city.country}`}
            >
              {city.name}, {city.country}
            </button>
          ))}
        <br />
        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            handleSelectCity(searchValue);
          }}
        >
          Rechercher
        </button>
      </form>
    </div>
  );
}

export default Searchbar;
