import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";

export default function Weather() {
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState("");

  const fetchWeather = async () => {
    const response = await axios.get(`/api/weather?city=${location}`);
    setWeather(response.data);
  };

  return (
    <div>
      <Navbar />
      <main style={{ textAlign: "center", padding: "20px" }}>
        <h1>Weather Forecast</h1>
        <input
          type="text"
          placeholder="Enter city..."
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button onClick={fetchWeather}>Get Weather</button>
        {weather && <p>Temperature: {weather.temp}°C, Condition: {weather.condition}</p>}
      </main>
      <Footer />
    </div>
  );
}