import axios from "axios";
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
    await AsyncStorage.removeItem("user_id");
    await AsyncStorage.removeItem("username");
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
