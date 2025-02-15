const priceData = {
    wheat: { jaipur: 30, village1: 28, village2: 32 },
    rice: { jaipur: 40, village1: 38, village2: 42 },
    carrot: { jaipur: 50, village1: 45, village2: 55 },
  };
  
  export default function handler(req, res) {
    const { crop, location } = req.query;
    if (!crop || !location) return res.status(400).json({ error: "Crop and location required" });
  
    const lowerCrop = crop.toLowerCase();
    const lowerLocation = location.toLowerCase();
  
    if (priceData[lowerCrop] && priceData[lowerCrop][lowerLocation]) {
      res.status(200).json({ price: priceData[lowerCrop][lowerLocation] });
    } else {
      res.status(404).json({ error: "Data not available for this crop or location" });
    }
  }
  