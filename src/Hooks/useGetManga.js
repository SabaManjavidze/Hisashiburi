import React, { useState, createContext, useContext } from "react";

export const MangaContext = createContext(null);
export const useGetManga = () => useContext(MangaContext);
export default function useGetMangaHook({ children }) {
  const [navigation, setNav] = useState(null);
  const [route, setRoute] = useState(null);
  const [chapters, setChapters] = useState(null);
  const [manga, setManga] = useState(null);
  return (
    <MangaContext.Provider
      value={{
        navigation,
        route,
        chapters,
        manga,
        setManga,
        setChapters,
        setNav,
        setRoute,
      }}
    >
      {children}
    </MangaContext.Provider>
  );
}
