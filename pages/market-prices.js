import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";

export default function MarketPrices() {
  const [crop, setCrop] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState(null);

  const fetchPrice = async () => {
    const response = await axios.get(`/api/prices?crop=${crop}&location=${location}`);
    setPrice(response.data.price);
  };

  return (
    <div>
      <Navbar />
      <main style={{ textAlign: "center", padding: "20px" }}>
        <h1>Market Prices</h1>
        <input
          type="text"
          placeholder="Enter crop name..."
          value={crop}
          onChange={(e) => setCrop(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter location..."
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button onClick={fetchPrice}>Get Price</button>
        {price && <p>Current Price: ₹{price} per kg</p>}
      </main>
      <Footer />
    </div>
  );
}
