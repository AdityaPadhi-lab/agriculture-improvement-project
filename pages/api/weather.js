const weatherData = {
  jaipur: { temp: 28, condition: "Sunny" },
  udaipur: { temp: 25, condition: "Cloudy" },
  kota: { temp: 30, condition: "Hot" },
  ajmer: { temp: 27, condition: "Windy" },
  "village-1": { temp: 26, condition: "Rainy" },
  "village-2": { temp: 29, condition: "Sunny" },
};

export default function handler(req, res) {
  const { city } = req.query;
  if (!city) return res.status(400).json({ error: "City required" });

  const lowerCity = city.toLowerCase();
  const data = weatherData[lowerCity];

  if (data) {
    res.status(200).json(data);
  } else {
    res.status(404).json({ error: "Location not found" });
  }
}
