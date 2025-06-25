export const saveFavorite = (id: string) => {
  const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
  if (!favorites.includes(id)) {
    favorites.push(id);
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }
};

export const removeFavorite = (id: string) => {
  const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
  const updated = favorites.filter((fav: string) => fav !== id);
  localStorage.setItem("favorites", JSON.stringify(updated));
};

export const getFavorites = (): string[] => {
  return JSON.parse(localStorage.getItem("favorites") || "[]");
};
