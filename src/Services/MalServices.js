import axios from "axios";
import { AsyncStorage } from "react-native";
import { CLIENT_ID, profile_url, top_manga_url } from "../components/variables";

import { useAuth } from "../Hooks/useAuth";
export const getProfile = async (access_token) => {
  const headers = {
    Authorization: `Bearer ${access_token}`,
  };
  try {
    const { data } = await axios.get(profile_url, { headers });
    // console.log(JSON.stringify(data, null, 2));
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
    `${profile_url}/mangalist?fields=alternative_titles`,
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
