import "./App.css";
import Header from "./components/Header/Header.jsx";
import Searchbar from "./components/Searchbar/Searchbar.jsx";
import WeatherLayout from "./components/WeatherLayout/WeatherLayout.jsx";

function App() {
  return (
    <div className="App">

      <Header />
      <Searchbar />
      <WeatherLayout />
    </div>
  );
}

export default App;
