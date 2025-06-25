// src/screens/Home.tsx
import { useEffect, useState } from "react";
import { fetchNowPlaying, fetchComingSoon, fetchMovieDetails } from "../api/tmdb";
import { getFavorites } from "../utils/storage";
import TrailerCard from "../components/TrailerCard";
import NavBar from "../components/NavBar";

export default function Home() {
  const [nowPlaying, setNowPlaying] = useState<any[]>([]);
  const [comingSoon, setComingSoon] = useState<any[]>([]);
  const [favorites, setFavorites] = useState<any[]>([]);

  useEffect(() => {
    fetchNowPlaying().then(setNowPlaying);
    fetchComingSoon().then(setComingSoon);

    const favoriteIds = getFavorites();
    Promise.all(favoriteIds.map(id => fetchMovieDetails(id))).then(setFavorites);
  }, []);

  return (
    <div style={{ paddingBottom: "4rem" }}>
      <h2>Now Playing</h2>
      <div style={{ display: "flex", overflowX: "scroll", gap: "1rem" }}>
        {nowPlaying.map(movie => (
          <TrailerCard key={movie.id} movie={movie} />
        ))}
      </div>

      <h2>Coming Soon</h2>
      <div style={{ display: "flex", overflowX: "scroll", gap: "1rem" }}>
        {comingSoon.map(movie => (
          <TrailerCard key={movie.id} movie={movie} />
        ))}
      </div>

      <h2>Saved Trailers</h2>
      <div style={{ display: "flex", overflowX: "scroll", gap: "1rem" }}>
        {favorites.map(movie => (
          <TrailerCard key={movie.id} movie={movie} />
        ))}
      </div>

      <NavBar />
    </div>
  );
}
