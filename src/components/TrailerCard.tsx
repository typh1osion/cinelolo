// src/components/TrailerCard.tsx
import { Link } from "react-router-dom";

export default function TrailerCard({ movie }: { movie: any }) {
  const imageUrl = `https://image.tmdb.org/t/p/w342${movie.poster_path}`;

  return (
    <Link to={`/view/${movie.id}`} style={{ textDecoration: "none", color: "white" }}>
      <div style={{ width: 150 }}>
        <img src={imageUrl} alt={movie.title} style={{ width: "100%", borderRadius: 8 }} />
        <p style={{ marginTop: 4, fontSize: "0.9rem" }}>{movie.release_date}</p>
      </div>
    </Link>
  );
}
