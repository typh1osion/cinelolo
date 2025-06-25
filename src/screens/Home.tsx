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
    // Filter Now Playing: Must have poster + release_date, and be within last 2 months
    fetchNowPlaying().then((movies) => {
      const filtered = movies.filter((m: any) =>
        m.poster_path &&
        m.release_date &&
        new Date(m.release_date) >= new Date(Date.now() - 60 * 24 * 60 * 60 * 1000)
      );
      setNowPlaying(filtered);
    });

    // Filter Coming Soon: Must have poster + future release_date within next 6 months
    fetchComingSoon().then((movies) => {
      const today = new Date();
      const sixMonthsFromNow = new Date();
      sixMonthsFromNow.setMonth(today.getMonth() + 6);

      const filtered = movies.filter((m: any) => {
        const release = new Date(m.release_date);
        return (
          m.poster_path &&
          m.release_date &&
          release > today &&
          release <= sixMonthsFromNow
        );
      });
      setComingSoon(filtered);
    });

    // Load saved favorites
    const favoriteIds = getFavorites();
    Promise.all(favoriteIds.map(id => fetchMovieDetails(id))).then(setFavorites);
  }, []);

  return (
    <div style={{ padding: "1rem 1rem 4rem 1rem" }}>
      <h2>Now Playing</h2>
    <div style={{ maxHeight: "32vh", overflowY: "hidden" }}>	
      <div style={{ display: "flex", overflowX: "scroll", gap: "1rem" }}>
        {nowPlaying.map(movie => (
          <TrailerCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>

      <h2>Coming Soon</h2>
    <div style={{ maxHeight: "32vh", overflowY: "hidden" }}>
      <div style={{ display: "flex", overflowX: "scroll", gap: "1rem" }}>
        {comingSoon.map(movie => (
          <TrailerCard key={movie.id} movie={movie} />
        ))}
      </div>
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
