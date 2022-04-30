import { main_url } from "../components/variables";

export const fetchData = async (manga_id) => {
  const url = `${main_url}/manga/${manga_id}`;
  const data = await fetch(url);
  const json = await data.json();
  return json;
};
