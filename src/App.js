import React from "react";
import WeatherRadar from "./components/WeatherRadar";
import WeatherWebcam from "./components/WeatherWebcam";
import MetarData from "./components/MetarData";
import TafData from "./components/TafData";
import "./index.css";

function App() {
  return (
    <div className="container">
      <WeatherRadar />
      <WeatherWebcam />
      <MetarData />
      <TafData />
    </div>
  );
}

export default App;
