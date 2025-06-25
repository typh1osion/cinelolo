// src/screens/Favorites.tsx
import { useEffect, useState } from "react";
import { getFavorites } from "../utils/storage";
import { fetchMovieDetails } from "../api/tmdb";
import TrailerCard from "../components/TrailerCard";
import NavBar from "../components/NavBar";

export default function Favorites() {
  const [favorites, setFavorites] = useState<any[]>([]);

  useEffect(() => {
    const ids = getFavorites();
    if (ids.length === 0) return;
    Promise.all(ids.map(id => fetchMovieDetails(id))).then(setFavorites);
  }, []);

  return (
    <div style={{ paddingBottom: "4rem" }}>
      <h2 style={{ padding: "1rem" }}>Saved Trailers</h2>

      {favorites.length === 0 ? (
        <p style={{ padding: "1rem" }}>You haven’t saved any trailers yet!</p>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", padding: "1rem" }}>
          {favorites.map(movie => (
            <TrailerCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}

      <NavBar />
    </div>
  );
}
