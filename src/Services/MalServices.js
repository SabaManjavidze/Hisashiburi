import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  CLIENT_ID,
  MAL_API_URL,
  profile_url,
  top_manga_url,
} from "../components/variables";

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
    `${profile_url}/mangalist?fields=alternative_titles,my_list_status{score,status}&limit=50`,
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
export const getMangaOnMAL = async (details, access_token) => {
  const fields = `fields=my_list_status,alternative_titles,mean,
  status,authors,genres,synopsis,popularity,rank,num_list_users`;
  const url = `${MAL_API_URL}/manga?q=${details.title}&limit=5&${fields}`;
  const headers = {
    Authorization: `Bearer ${access_token}`,
  };
  const {
    data: { data },
  } = await axios.get(url, { headers });
  // console.log(details);
  const title_lower = removePunctuation(details.title);
  const alt_titles = details.alternative_titles;
  for (var j = 0; j < data.length - 1; j++) {
    const child = data[j];
    const {
      title,
      alternative_titles: { synonyms, en, ja },
    } = child.node;
    const mal_title = removePunctuation(title);
    if (mal_title === title_lower) {
      console.log({ mal_title, title_lower, synonyms, en, ja, alt_titles });
      // console.log("isequal");
      return child.node;
    }
    for (var i = 0; i < alt_titles.length; i++) {
      const lower_alt_title = removePunctuation(alt_titles[i]);
      const isEqual =
        synonyms.map((item) => removePunctuation(item) === lower_alt_title) ||
        lower_alt_title === en ||
        lower_alt_title === ja;
      if (isEqual) return child.node;
    }
    // console.log({ mal_title, title_lower, isEqual: mal_title === title_lower });
  }

  // if (obj && obj.node) {
  //   console.log(obj.node.title, "TITLE");
  // }
  console.log("NOT FOUND");
  return null;
  // return obj ? obj.node : null;
};
const removePunctuation = (str) => {
  return str.replace(":", "").replace("-", "").replace(" ", "").toLowerCase();
};
