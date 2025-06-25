import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav style={{ display: "flex", justifyContent: "space-around", padding: "1rem", background: "#1f1f1f" }}>
      <Link to="/">Home</Link>
      <Link to="/search">Search</Link>
      <Link to="/favorites">Favorites</Link>
    </nav>
  );
}