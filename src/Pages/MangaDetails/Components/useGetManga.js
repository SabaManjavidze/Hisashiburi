import React, { useState, createContext, useContext } from "react";

export const MangaContext = createContext(null);
export const useGetManga = () => useContext(MangaContext);
// navigation, route, chapters, manga_id, title
export default function useGetMangaHook({ children }) {
  const [navigation, setNav] = useState(null);
  const [route, setRoute] = useState(null);
  const [chapters, setChapters] = useState(null);
  const [{ manga_id, title }, setItem] = useState(null);
  return (
    <MangaContext.Provider
      value={{
        navigation,
        route,
        chapters,
        manga_id,
        title,
        setItem,
        setChapters,
        setNav,
        setRoute,
      }}
    >
      {children}
    </MangaContext.Provider>
  );
}
