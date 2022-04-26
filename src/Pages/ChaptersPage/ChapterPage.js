import React, { useRef, useEffect, useState, useContext } from "react";
import { StyleSheet, View, StatusBar, Text } from "react-native";
import WebView from "react-native-webview";
import ChapterNav from "./Components/ChapterNav";
import ReaderAppbar from "./Components/ReaderAppbar";
import { html, main_color, main_url } from "../../components/variables";
import { useAuth } from "../../Hooks/useAuth";
import { getProfile } from "../../Services/MalServices";
import { gql, useMutation } from "@apollo/client";

export default function ChapterPage({ navigation, route }) {
  let { manga_title, manga_id, chapters, index } = route.params;
  // let { title, manga_id, chapters } = useGetManga();

  const [data, setData] = useState([]);

  const [chapter, setChapter] = useState(chapters[index]);
  const [idx, setIndex] = useState(index);
  const [hide, sethide] = useState(false);

  const [loaded, setLoaded] = useState(false);
  const scroll_ref = useRef(null);

  const { token } = useAuth();

  const CREATE_READ_MANGA = gql`
    mutation createReadManga($user_id: Int!, $manga_id: String!) {
      createReadManga(user_id: $user_id, manga_id: $manga_id)
    }
  `;
  const [
    createReadManga,
    { loading: rm_loading, error: rm_error, data: rm_data },
  ] = useMutation(CREATE_READ_MANGA);

  const CREATE_MANGA = gql`
    mutation createManga($title: String!, $manga_id: String!) {
      createManga(title: $title, manga_id: $manga_id) {
        title
        manga_id
      }
    }
  `;
  const [
    createManga,
    { loading: manga_loading, error: manga_error, data: manga_data },
  ] = useMutation(CREATE_MANGA);

  const fetchData = async () => {
    const url = `${main_url}/manga/${manga_id}/${chapter.chapter_num}`;
    const data = await fetch(url);
    const json = await data.json();
    setData(json);
    setLoaded(true);
  };

  const addToHistory = async () => {
    try {
      const user = await getProfile(token);
      // console.log(user);
      const { id, name, picture } = user;
      await createManga({
        variables: {
          manga_id,
          title: manga_title,
        },
      });
      await createReadManga({
        variables: {
          user_id: id,
          manga_id,
        },
      });
    } catch (error) {
      console.log(JSON.stringify(error, null, 2));
    }
  };
  useEffect(() => {
    if (chapter != null) {
      fetchData();
      navigation.setOptions({ title: chapter.chap_title });

      if (loaded && scroll_ref != null && scroll_ref.current != null) {
        scroll_ref.current.scrollToOffset({ animated: true, offset: 0 });
      }
      if (token) {
        addToHistory();
      }
    }
  }, [chapter]);
  return (
    <View style={{ backgroundColor: main_color, flex: 1 }}>
      <StatusBar
        backgroundColor={hide ? "transparent" : "rgba(40, 42, 65, 0.45)"}
        translucent
      />
      {/* {console.log(
        manga_error
          ? JSON.stringify(manga_error, null, 2)
          : manga_loading
          ? "manga loading..."
          : JSON.stringify({ data: manga_data }, null, 2)
      )}
      {console.log(
        rm_error
          ? JSON.stringify(rm_error, null, 2)
          : rm_loading
          ? "RM loading..."
          : JSON.stringify({ data: rm_data }, null, 2)
      )} */}
      <ReaderAppbar
        chapters={chapters}
        setIndex={setIndex}
        navigation={navigation}
        route={route}
        setChap={setChapter}
        idx={idx}
        hide={hide}
      />

      {loaded && (
        <View style={{ flex: 1 }}>
          <WebView
            style={{
              backgroundColor: main_color,
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
            }}
            originWhitelist={["*"]}
            // onTouchEnd={() => hide && sethide(false)}
            // onTouchStart={() => sethide(true)}
            onTouchMove={() => sethide(true)}
            nestedScrollEnabled={true}
            scalesPageToFit={true}
            showsVerticalScrollIndicator={false}
            onMessage={() => sethide(!hide)}
            source={{
              html: `
                  ${html}
                  ${data
                    .map(
                      (item) =>
                        `<img src="${item.src}" onClick={window.ReactNativeWebView.postMessage("helo")}>`
                    )
                    .join("")}
                  </body>
                  </html>
                  `,
            }}
          />
        </View>
      )}
      <ChapterNav
        setChapter={setChapter}
        setIndex={setIndex}
        idx={idx}
        navigation={navigation}
        chapters={chapters}
        hide={hide}
      />
      {/* <ActivityIndicator animating={true} color={primary_color} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#15101f",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    flexDirection: "column",
  },
});