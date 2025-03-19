// Service for the API calls to WeatherAPI

const BASE_URL = "https://api.weatherapi.com/v1/";
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

if (!API_KEY) {
    console.error("ERREUR ! LA CLE API N'EST PAS DEFINIE, VEUILLEZ LA CONFIGURER DANS LE FICHIER .ENV");
    
}


/**
 * Fais une requête API des données meteo, retourne les données en json
 * @param {*} city 
 * @param {*} days 
 * @returns 
 */
export const fetchWeatherForecast = async (city = "Lyon", days = 4) => {

    if (!API_KEY)  {
        throw new Error("Clé API non configuré");
    }


    try { 
        const response = await fetch(`${BASE_URL}forecast.json?key=${API_KEY}&q=${city}&days=${days}&aqi=yes&alerts=no`);
        
        if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
        }    

        const data = await response.json();
        return data;

    } catch (error) {
        console.error("Erreur lors de la récupération des données : ", error);
        throw error;
    }

    
}

/**
 * Fetches the names
 * @param {*} city 
 * @returns 
 */
export const fetchWeatherName = async (city) => {
    try {
        const response = await fetch(`${BASE_URL}search.json?key=${API_KEY}&q=${city}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Error fetching weather data:", error);
        throw error;
      }
}