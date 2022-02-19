import axios from "axios";
import { AsyncStorage } from "react-native";
import { profile_url, top_manga_url } from "../components/variables";

export const getProfile = async (access_token) => {
  const headers = {
    Authorization: `Bearer ${access_token}`,
  };
  const { data } = await axios.get(profile_url, { headers });
  return data;
};
export const logOut = async () => {
  try {
    await AsyncStorage.removeItem("access_token");
    await AsyncStorage.removeItem("refresh_token");
    await AsyncStorage.removeItem("expires_in");
  } catch (error) {
    console.log(error);
  }
};
export const getMangaList = async (access_token) => {
  const headers = {
    Authorization: `Bearer ${access_token}`,
  };
  const { data } = await axios.get(
    `${profile_url}/mangalist?fields=alternative_titles`,
    { headers }
  );
  return data;
};
export const getTopManga = async (access_token) => {
  const headers = {
    Authorization: `Bearer ${access_token}`,
  };
  const { data } = await axios.get(`${top_manga_url}`, { headers });
  return data;
};
export const getMangaOnMAL = async (title, access_token) => {
  const url = `https://api.myanimelist.net/v2/manga?q=${title}&limit=5&fields=my_list_status,alternative_titles`;
  const headers = {
    Authorization: `Bearer ${access_token}`,
  };
  const { data } = await axios.get(url, { headers });
  const title_lower = title.toLowerCase().replace(":", "").replace("-", "");
  // console.log(data.data[0].node, null, 2);
  const obj = data.data.find(
    (child) =>
      title_lower ===
      child.node.title.toLowerCase().replace(":", "").replace("-", "")
  );
  // console.log(obj ? obj : "object is null");

  return obj ? obj.node : null;
};
