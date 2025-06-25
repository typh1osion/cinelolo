// src/api/tmdb.ts
import axios from "axios";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export const fetchNowPlaying = async () => {
  const { data } = await axios.get(`${BASE_URL}/movie/now_playing`, {
    params: {
      api_key: API_KEY,
      language: "en-US",
      region: "US",
      page: 1,
    },
  });
  return data.results;
};

export const fetchComingSoon = async () => {
  const { data } = await axios.get(`${BASE_URL}/movie/upcoming`, {
    params: {
      api_key: API_KEY,
      language: "en-US",
      region: "US",
      page: 1,
    },
  });
  return data.results;
};

export const fetchMovieDetails = async (movieId: string) => {
  const { data } = await axios.get(`${BASE_URL}/movie/${movieId}`, {
    params: {
      api_key: API_KEY,
      append_to_response: "videos",
    },
  });
  return data;
};

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