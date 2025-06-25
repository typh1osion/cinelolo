import { Link } from "react-router-dom";
import { FaSearch, FaHeart, FaHome } from "react-icons/fa";

export default function NavBar() {
  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        background: "#1f1f1f",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0.75rem 1rem",
        zIndex: 1000,
      }}
    >
      <Link to="/search" title="Search">
        <FaSearch color="white" size={20} />
      </Link>

      <Link to="/" title="Home">
        <FaHome color="white" size={20} />
      </Link>

      <Link to="/favorites" title="Favorites">
        <FaHeart color="white" size={20} />
      </Link>
    </nav>
  );
}
