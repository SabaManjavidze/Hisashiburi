import React, { useRef, useEffect, useState, useContext } from "react";
import { StyleSheet, View, StatusBar, Text, Image } from "react-native";
import WebView from "react-native-webview";
import ChapterNav from "./Components/ChapterNav";
import ReaderAppbar from "./Components/ReaderAppbar";
import {
  clg,
  curr_host,
  html,
  main_color,
  main_url,
  transp_main_color,
} from "../../components/variables";
import { useAuth } from "../../Hooks/useAuth";
import { gql, useMutation } from "@apollo/client";
import { CREATE_READ_MANGA, CREATE_MANGA } from "../../graphql/Mutations";
import throttle from "lodash.throttle";
import { FlatList } from "react-native";

export default function ChapterPage({ navigation, route }) {
  let { manga, chapters, index } = route.params;

  const [data, setData] = useState([]);

  const [chapter, setChapter] = useState(chapters[index]);
  const [idx, setIndex] = useState(index);
  // const [page, setPage] = useState(1);
  const [hide, sethide] = useState(false);

  const post_web_message = "window.ReactNativeWebView.postMessage";

  const [loaded, setLoaded] = useState(false);
  const webViewRef = useRef(null);

  const { token, user } = useAuth();

  const [
    createReadManga,
    { loading: rm_loading, error: rm_error, data: rm_data },
  ] = useMutation(CREATE_READ_MANGA);

  const [
    createManga,
    { loading: manga_loading, error: manga_error, data: manga_data },
  ] = useMutation(CREATE_MANGA);

  const fetchChapter = async () => {
    const url = `${main_url}/manga/${manga.manga_id}/${chapter.chap_num}`;
    const data = await fetch(url);
    const json = await data.json();
    setData(json);
    setLoaded(true);
  };
  // useEffect(() => {
  //   if (!rm_loading) {
  //     clg({ rm_error, rm_data });
  //   }
  //   if (!manga_loading) {
  //     clg({ manga_error, manga_data });
  //   }
  // }, [rm_loading, manga_loading]);

  const addToHistory = async () => {
    try {
      const { user_id } = user;
      await createManga({
        variables: {
          manga_id: manga.manga_id,
          title: manga.title,
          img_url: manga.img_url,
        },
      });
      const read_date = `${new Date().toLocaleDateString()}, ${new Date().toLocaleTimeString()}`;
      // console.log(read_date);
      await createReadManga({
        variables: {
          user_id: user_id,
          manga_id: manga.manga_id,
          last_read_chapter: chapter.chap_num,
          read_date,
        },
      });
    } catch (error) {
      // console.log({
      //   readMangaError: JSON.stringify(rm_error, null, 2),
      //   mangaError: JSON.stringify(manga_error, null, 2),
      // });
      throw new Error(JSON.stringify(error, null, 2));
    }
  };
  useEffect(() => {
    if (chapter != null) {
      fetchChapter();
      setLoaded(true);
      navigation.setOptions({ title: chapter.chap_title });
      if (token && manga.manga_id) {
        addToHistory();
      }
    }
  }, [chapter]);

  const onMessage = (e) => {
    if (e.nativeEvent.data === "hide") {
      sethide(!hide);
    }
  };
  return (
    <View style={{ backgroundColor: main_color, flex: 1 }}>
      <StatusBar
        backgroundColor={hide ? "transparent" : "rgba(40, 42, 65, 0.45)"}
        translucent
      />
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
            ref={webViewRef}
            onTouchMove={() => sethide(true)}
            nestedScrollEnabled={true}
            scalesPageToFit={true}
            showsVerticalScrollIndicator={false}
            onMessage={onMessage}
            source={{
              html: `
                  ${html}
                  ${data
                    .map(
                      (item) =>
                        `<img src="${item.src}" id="${item.src}" onClick={${post_web_message}("hide")} />`
                    )
                    .join("")}
                  </body>
                  </html>
                  `,
            }}
          />
        </View>
      )}
      {/* <View
        style={{
          width: "100%",
          position: "absolute",
          justifyContent: "center",
          alignItems: "center",
          bottom: 50,
        }}
      >
        <View
          style={{
            backgroundColor: "hsla(0, 0%, 0%, 0.51)",
            borderRadius: 10,
            padding: 10,
          }}
        >
          <Text
            style={{ fontSize: 20, color: "white" }}
          >{`${page}/${data.length}`}</Text>
        </View>
      </View> */}
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
