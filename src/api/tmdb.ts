import axios from "axios";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

// Helper to fetch and combine multiple pages
const fetchMultiplePages = async (url: string, params: Record<string, any>) => {
  const pagePromises = Array.from({ length: 10 }, (_, i) =>
    axios.get(url, {
      params: {
        ...params,
        page: i + 1,
      },
    })
  );

  const responses = await Promise.all(pagePromises);
  const allResults = responses.flatMap((res) => res.data.results);
  return allResults;
};

// ✅ Coming Soon — using /movie/upcoming
export const fetchComingSoon = async () => {
  const params = {
    api_key: API_KEY,
    language: "en-US",
    region: "US",
  };

  return await fetchMultiplePages(`${BASE_URL}/movie/upcoming`, params);
};

// ✅ Now Playing — using /movie/now_playing
export const fetchNowPlaying = async () => {
  const params = {
    api_key: API_KEY,
    language: "en-US",
    region: "US",
  };

  return await fetchMultiplePages(`${BASE_URL}/movie/now_playing`, params);
};

// ✅ Get full movie details including videos
export const fetchMovieDetails = async (movieId: string) => {
  const { data } = await axios.get(`${BASE_URL}/movie/${movieId}`, {
    params: {
      api_key: API_KEY,
      append_to_response: "videos",
    },
  });

  return data;
};

// ✅ Search function
export const searchMovies = async (query: string) => {
  const { data } = await axios.get(`${BASE_URL}/search/movie`, {
    params: {
      api_key: API_KEY,
      language: "en-US",
      query,
      include_adult: false,
    },
  });

  return data.results;
};
