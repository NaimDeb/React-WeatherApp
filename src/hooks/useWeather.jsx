// import { useState, useEffect, useCallback } from "react";
// import { fetchWeatherForecast } from "../services/WeatherService";

// /**
//  * Hook personnalisé pour gérer les données météo
//  * @param {string} defaultCity - Ville par défaut
//  * @returns {Object} - État et fonctions liés aux données météo
//  */
// function useWeather(defaultCity = "Lyon") {
//   const [city, setCity] = useState(defaultCity);
//   const [weatherData, setWeatherData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fonction pour formater les données brutes de l'API en format utilisable par nos composants
//   const formatWeatherData = useCallback((data) => {
//     if (!data) return null;

//     // Jours de la semaine en français
//     const daysOfWeek = [
//       "Dimanche",
//       "Lundi",
//       "Mardi",
//       "Mercredi",
//       "Jeudi",
//       "Vendredi",
//       "Samedi",
//     ];

//     // Formatage des jours de prévision
//     const formattedDays = data.forecast.forecastday.map((day, index) => {
//       const date = new Date(day.date);
//       return {
//         name: index === 0 ? "Aujourd'hui" : daysOfWeek[date.getDay()],
//         active: index === 0,
//         date: day.date,
//         temp: day.day.avgtemp_c,
//         icon: day.day.condition.icon,
//         code: day.day.condition.code,
//       };
//     });

//     return {
//       city: data.location.name,
//       country: data.location.country,
//       temperature: Math.round(data.current.temp_c),
//       icon: data.current.condition.icon,
//       iconCode: data.current.condition.code,
//       conditionText: data.current.condition.text,
//       wind: {
//         speed: Math.round(data.current.wind_kph),
//         direction: data.current.wind_degree,
//       },
//       days: formattedDays,
//     };
//   }, []);

//   // Fonction pour charger les données météo
//   const fetchWeather = useCallback(
//     async (cityName = city) => {
//       try {
//         setLoading(true);
//         setError(null);
//         const data = await fetchWeatherForecast(cityName);
//         setWeatherData(formatWeatherData(data));
//       } catch (err) {
//         setError(
//           "Impossible de récupérer les données météo. Veuillez réessayer."
//         );
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     },
//     [city, formatWeatherData]
//   );

//   // Fonction pour changer de ville
//   const changeCity = useCallback(
//     (newCity) => {
//       setCity(newCity);
//       fetchWeather(newCity);
//     },
//     [fetchWeather]
//   );

//   // Chargement initial des données
//   useEffect(() => {
//     fetchWeather();
//   }, [fetchWeather]);

//   return {
//     weatherData,
//     loading,
//     error,
//     changeCity,
//     refreshWeather: fetchWeather,
//   };
// }

// export default useWeather;