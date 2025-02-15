import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div>
      <Navbar />
      <main style={{ textAlign: "center", padding: "50px" }}>
        <h1>Welcome to Sustainable Agriculture</h1>
        <p>Empowering farmers with technology-driven insights.</p>
      </main>
      <Footer />
    </div>
  );
}