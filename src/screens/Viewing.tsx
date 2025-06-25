// src/screens/Viewing.tsx
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchMovieDetails } from "../api/tmdb";
import { saveFavorite, removeFavorite, getFavorites } from "../utils/storage";
import { FaHeart, FaRegHeart, FaShareAlt } from "react-icons/fa";

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

  const handleShare = () => {
    const url = window.location.href;

    if (navigator.share) {
      navigator
        .share({
          title: movie.title,
          text: `Check out this trailer for ${movie.title}`,
          url,
        })
        .catch(console.error);
    } else {
      navigator.clipboard.writeText(url).then(() => {
        alert("Link copied to clipboard!");
      });
    }
  };

  if (!movie) return <div>Loading...</div>;

  const trailer = movie.videos?.results?.find(
    (vid: any) => vid.type === "Trailer" && vid.site === "YouTube"
  );

  return (
    <div style={{ padding: "1rem", paddingTop: "4rem" }}>
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

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "1rem",
          marginBottom: "0.5rem",
        }}
      >
        <h2 style={{ margin: 0, fontSize: "1.5rem", flexGrow: 1 }}>
          {movie.title}
        </h2>
        <div style={{ display: "flex", gap: "0.75rem" }}>
          <button
            onClick={handleShare}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: "1.8rem",
              color: "white",
              padding: 0,
            }}
            aria-label="Share Trailer"
          >
            <FaShareAlt />
          </button>
          <button
            onClick={toggleFavorite}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: "1.8rem",
              color: "white",
              padding: 0,
            }}
            aria-label="Toggle Favorite"
          >
            {isFavorite ? <FaHeart /> : <FaRegHeart />}
          </button>
        </div>
      </div>

      <p>Release Date: {movie.release_date}</p>

      {trailer ? (
        <iframe
          width="100%"
          height="200"
          src={`https://www.youtube.com/embed/${trailer.key}?cc_load_policy=1`}
          title={trailer.name}
          frameBorder="0"
          allowFullScreen
        ></iframe>
      ) : (
        <p>No trailer available</p>
      )}
    </div>
  );
}
