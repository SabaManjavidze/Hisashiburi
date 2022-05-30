import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CLIENT_ID, profile_url, top_manga_url } from "../components/variables";

export const getProfile = async (access_token) => {
  const headers = {
    Authorization: `Bearer ${access_token}`,
  };
  try {
    const { data } = await axios.get(profile_url, { headers });
    return data;
  } catch (error) {
    return error;
  }
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
    `${profile_url}/mangalist?fields=alternative_titles,my_list_status{score,status}`,
    { headers }
  );
  return data;
};
export const getTopManga = async (access_token, url) => {
  var headers;
  if (access_token) {
    headers = {
      Authorization: `Bearer ${access_token}`,
    };
  } else {
    headers = {
      "X-MAL-Client-ID": CLIENT_ID,
    };
  }
  const { data } = await axios.get(url, { headers });
  return data;
};
export const getMangaOnMAL = async (title, access_token) => {
  const fields = `fields=my_list_status,alternative_titles,mean,
  status,authors,genres,synopsis,popularity,rank,num_list_users`;
  const url = `https://api.myanimelist.net/v2/manga?q=${title}&limit=5&${fields}`;
  const headers = {
    Authorization: `Bearer ${access_token}`,
  };
  const { data } = await axios.get(url, { headers });
  const title_lower = title.toLowerCase().replace(":", "").replace("-", "");
  const obj = data.data.find(
    (child) =>
      title_lower ===
      child.node.title.toLowerCase().replace(":", "").replace("-", "")
  );

  return obj ? obj.node : null;
};
