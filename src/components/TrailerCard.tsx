// src/components/TrailerCard.tsx
import { Link } from "react-router-dom";

export default function TrailerCard({ movie }: { movie: any }) {
  const imageUrl = `https://image.tmdb.org/t/p/w342${movie.poster_path}`;

  return (
    <Link to={`/view/${movie.id}`} style={{ textDecoration: "none", color: "white" }}>
      <div style={{ width: 120 }}>
        <img
          src={imageUrl}
          alt={movie.title}
          style={{ width: "100%", borderRadius: 6 }}
        />
        <div style={{ marginTop: 6 }}>
          <p style={{ fontSize: "0.9rem", fontWeight: "bold", margin: 0 }}>
            {movie.title}
          </p>
          <p style={{ fontSize: "0.75rem", opacity: 0.8, margin: 0 }}>
            {movie.release_date}
          </p>
        </div>
      </div>
    </Link>
  );
}
