import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";

export default function CropRecommendation() {
  const [soilType, setSoilType] = useState("");
  const [recommendedCrop, setRecommendedCrop] = useState("");

  const fetchCrop = async () => {
    const response = await axios.get(`/api/crop?soil=${soilType}`);
    setRecommendedCrop(response.data.crop);
  };

  return (
    <div>
      <Navbar />
      <main style={{ textAlign: "center", padding: "20px" }}>
        <h1>Crop Recommendation</h1>
        <input
          type="text"
          placeholder="Enter soil type..."
          value={soilType}
          onChange={(e) => setSoilType(e.target.value)}
        />
        <button onClick={fetchCrop}>Suggest Crop</button>
        {recommendedCrop && <p>Recommended Crop: {recommendedCrop}</p>}
      </main>
      <Footer />
    </div>
  );
}