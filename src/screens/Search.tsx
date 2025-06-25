// src/screens/Search.tsx
import { useState } from "react";
import { searchMovies } from "../api/tmdb";
import TrailerCard from "../components/TrailerCard";
import NavBar from "../components/NavBar";

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;
    const movies = await searchMovies(query);
    setResults(movies);
  };

  return (
<div style={{ padding: "4rem 1rem 4rem 1rem" }}>
    <div style={{ paddingBottom: "4rem" }}>
      <form onSubmit={handleSearch} style={{ padding: "1rem" }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a movie..."
          style={{
            width: "100%",
            padding: "0.75rem",
            fontSize: "1rem",
            borderRadius: "6px",
            border: "1px solid #444",
            background: "#1e1e1e",
            color: "white",
          }}
        />
      </form>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", padding: "1rem" }}>
        {results.map(movie => (
          <TrailerCard key={movie.id} movie={movie} />
        ))}
      </div>

      <NavBar />
    </div>
</div>
  );
}
