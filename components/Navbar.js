export default function Navbar() {
    return (
      <nav style={{ padding: "10px", background: "#28a745", color: "white" }}>
        <a href="/" style={{ marginRight: "15px", color: "white" }}>Home</a>
        <a href="/weather" style={{ marginRight: "15px", color: "white" }}>Weather</a>
        <a href="/crop-recommendation" style={{ marginRight: "15px", color: "white" }}>Crop Suggestion</a>
        <a href="/market-prices" style={{ color: "white" }}>Market Prices</a>
      </nav>
    );
  }