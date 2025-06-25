// src/screens/Viewing.tsx
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchMovieDetails } from "../api/tmdb";
import { saveFavorite, removeFavorite, getFavorites } from "../utils/storage";

export default function Viewing() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<any>(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (!id) return;
    fetchMovieDetails(id).then(setMovie);
    setIsFavorite(getFavorites().includes(id));
  }, [id]);

  const toggleFavorite = () => {
    if (!id) return;
    if (isFavorite) {
      removeFavorite(id);
    } else {
      saveFavorite(id);
    }
    setIsFavorite(!isFavorite);
  };

  if (!movie) return <div>Loading...</div>;

  const trailer = movie.videos?.results?.find(
    (vid: any) => vid.type === "Trailer" && vid.site === "YouTube"
  );

  return (
    <div style={{ padding: "1rem" }}>
      <button
        onClick={() => navigate(-1)}
        style={{
          marginBottom: "1rem",
          fontSize: "1rem",
          background: "none",
          color: "white",
          border: "1px solid #666",
          borderRadius: "6px",
          padding: "0.5rem 1rem",
          cursor: "pointer",
        }}
      >
        ← Back
      </button>

      <h2>{movie.title}</h2>
      <p>Release Date: {movie.release_date}</p>

      {trailer ? (
        <iframe
          width="100%"
          height="200"
          src={`https://www.youtube.com/embed/${trailer.key}`}
          title={trailer.name}
          frameBorder="0"
          allowFullScreen
        ></iframe>
      ) : (
        <p>No trailer available</p>
      )}

      <button
        onClick={toggleFavorite}
        style={{
          marginTop: "1rem",
          background: "none",
          color: isFavorite ? "red" : "white",
          fontSize: "2rem",
          border: "none",
          cursor: "pointer",
        }}
      >
        {isFavorite ? "♥" : "♡"}
      </button>
    </div>
  );
}
