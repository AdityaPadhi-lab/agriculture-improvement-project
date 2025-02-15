const cropData = {
    sandy: { recommended: "Carrot", best_village: "Village-1" },
    clay: { recommended: "Rice", best_village: "Village-2" },
    loam: { recommended: "Wheat", best_village: "Village-3" },
  };
  
  export default function handler(req, res) {
    const { soil } = req.query;
    if (!soil) return res.status(400).json({ error: "Soil type required" });
  
    const lowerSoil = soil.toLowerCase();
    const data = cropData[lowerSoil];
  
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(404).json({ error: "No recommendation found" });
    }
  }
  