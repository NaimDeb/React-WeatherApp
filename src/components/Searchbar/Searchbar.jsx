import React, { useState } from "react";
import "./Searchbar.css";
import { fetchWeatherName } from "../../services/WeatherService";
import { FaSearch, FaCity } from "react-icons/fa";

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
  };

  const handleSelectSearch = (cityName) => {
    setSearchValue(cityName);
    setSearchData(null);
    handleSelectCity(cityName);
  };

  return (
    <div className="searchBar-container">
      <p>Rechercher une ville</p>
      <form>
        <input
          type="text"
          className="searchBar"
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value);
            handleSearchNames(e.target.value);
          }}
        />
        {searchData &&
          searchData.map((city) => (
            <div
              className="searchResult"
              onClick={(event) => {
                event.preventDefault();
                setSearchValue(city.name);
                handleSelectSearch(city.name);
              }}
              key={`${city.name}${city.country}`}
            >
              <FaCity className="searchResult-icon" />
              {city.name}, {city.country}
            </div>
          ))}
        <br />
        <button
          type="submit"
          className="searchButton"
          onClick={(e) => {
            e.preventDefault();
            handleSelectCity(searchValue);
          }}
        >
          <FaSearch className="searchButton-icon" />
          Rechercher
        </button>
      </form>
    </div>
  );
}

export default Searchbar;
