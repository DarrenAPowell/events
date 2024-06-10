import { useState, useEffect } from 'react';

export interface Item {
  id: string;
}

const useFavorites = () => {
  const [favorites, setFavorites] = useState<Item[]>(() => {
    const storedFavorites = localStorage.getItem('favorites');
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (item: Item) => {
    setFavorites((prevFavorites) => {
      const itemIndex = prevFavorites.findIndex((fav) => fav.id === item.id);
      if (itemIndex !== -1) {
        return prevFavorites.filter((fav) => fav.id !== item.id);
      } else {
        return [...prevFavorites, item];
      }
    });
  };

  return { favorites, toggleFavorite };
};

export default useFavorites;
