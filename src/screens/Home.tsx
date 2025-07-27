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
    // ✅ Filter Now Playing
    fetchNowPlaying().then(async (movies) => {
      const twoMonthsAgo = new Date(Date.now() - 60 * 24 * 60 * 60 * 1000);
      const today = new Date();

      const validMovies = movies.filter((m: any) => {
        const release = new Date(m.release_date);
        return (
          m.poster_path &&
          m.release_date &&
          release >= twoMonthsAgo &&
          release <= today
        );
      });

      const withTrailers: any[] = [];
      for (const movie of validMovies) {
        const details = await fetchMovieDetails(movie.id);
        const hasTrailer = details.videos?.results?.some(
          (v: any) => v.type === "Trailer" && v.site === "YouTube"
        );
        if (hasTrailer) withTrailers.push(movie);
      }

      withTrailers.sort(
        (a: any, b: any) => new Date(b.release_date).getTime() - new Date(a.release_date).getTime()
      );
      setNowPlaying(withTrailers);
    });

    // ✅ Filter Coming Soon
    fetchComingSoon().then(async (movies) => {
      const today = new Date();
      const sixMonthsFromNow = new Date();
      sixMonthsFromNow.setMonth(today.getMonth() + 6);

      const validMovies = movies.filter((m: any) => {
        const release = new Date(m.release_date);
        return (
          m.poster_path &&
          m.release_date &&
          release > today &&
          release <= sixMonthsFromNow
        );
      });

      const withTrailers: any[] = [];
      for (const movie of validMovies) {
        const details = await fetchMovieDetails(movie.id);
        const hasTrailer = details.videos?.results?.some(
          (v: any) => v.type === "Trailer" && v.site === "YouTube"
        );
        if (hasTrailer) withTrailers.push(movie);
      }

      withTrailers.sort(
        (a: any, b: any) => new Date(a.release_date).getTime() - new Date(b.release_date).getTime()
      );
      setComingSoon(withTrailers);
    });

    // ✅ Load Saved Trailers
    const favoriteIds = getFavorites();
    Promise.all(favoriteIds.map((id) => fetchMovieDetails(id))).then(setFavorites);
  }, []);

  return (
    <div style={{ padding: "4rem 1rem 4rem 1rem" }}>
      <h2>Now Playing</h2>
      <div style={{ display: "flex", overflowX: "scroll", gap: "1rem" }}>
        {nowPlaying.map((movie) => (
          <TrailerCard key={movie.id} movie={movie} />
        ))}
      </div>

      <h2>Coming Soon</h2>
      <div style={{ display: "flex", overflowX: "scroll", gap: "1rem" }}>
        {comingSoon.map((movie) => (
          <TrailerCard key={movie.id} movie={movie} />
        ))}
      </div>

      <h2>Saved Trailers</h2>
      <div style={{ display: "flex", overflowX: "scroll", gap: "1rem" }}>
        {favorites.map((movie) => (
          <TrailerCard key={movie.id} movie={movie} />
        ))}
      </div>

      <NavBar />
    </div>
  );

}