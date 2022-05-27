import React, { useRef, useEffect, useState, useContext } from "react";
import { StyleSheet, View, StatusBar, Text } from "react-native";
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

export default function ChapterPage({ navigation, route }) {
  let { manga_title, manga_id, chapters, index } = route.params;
  // let { title, manga_id, chapters } = useGetManga();

  // const [data, setData] = useState([]);

  const [chapter, setChapter] = useState(chapters[index]);
  const [idx, setIndex] = useState(index);
  // const [page, setPage] = useState(1);
  const [hide, sethide] = useState(false);

  // const post_web_message = "window.ReactNativeWebView.postMessage";

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

  // const fetchData = async () => {
  //   const url = `${main_url}/manga/${manga_id}/${chapter.chap_num}`;
  //   const data = await fetch(url);
  //   const json = await data.json();
  //   setData(json);
  //   setLoaded(true);
  // };
  useEffect(() => {
    if (!rm_loading) {
      clg({ rm_error });
    }
    if (!manga_loading) {
      clg({ manga_error });
    }
  }, [rm_loading, manga_loading]);

  const addToHistory = async () => {
    try {
      const { user_id } = user;
      await createManga({
        variables: {
          manga_id,
          title: manga_title,
        },
      });
      const read_date = `${new Date().toLocaleDateString()}, ${new Date().toLocaleTimeString()}`;
      // console.log(read_date);
      await createReadManga({
        variables: {
          user_id: user_id,
          manga_id,
          last_read_chapter: chapter.chap_num,
          read_date,
        },
      });
      // console.log({
      //   user_id,
      //   manga_title,
      //   manga_id,
      //   chap_num: chapter.chap_num,
      //   read_date,
      // });
    } catch (error) {
      clg(JSON.stringify(error, null, 2));
      // console.log({
      //   readMangaError: JSON.stringify(rm_error, null, 2),
      //   mangaError: JSON.stringify(manga_error, null, 2),
      // });
    }
  };
  useEffect(() => {
    if (chapter != null) {
      // fetchData();
      setLoaded(true);
      navigation.setOptions({ title: chapter.chap_title });
      // if (loaded && scroll_ref != null && scroll_ref.current != null) {
      //   scroll_ref.current.scrollToOffset({ animated: true, offset: 0 });
      // }
      if (token) {
        addToHistory();
      }
    }
  }, [chapter]);

  const onMessage = (e) => {
    const { data } = e.nativeEvent;
    clg(data);
    if (data === "hide") {
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
            // onScroll={(e) => {
            //   updatePages();
            // }}
            onMessage={onMessage}
            source={{
              uri:
                chapter &&
                `${curr_host}/chapter/${manga_id}/${chapter.chap_num}`,
            }}
          />
        </View>
      )}
      {/* {
              html: `
                  ${html}
                  ${data
                    .map(
                      (item) =>
                        `<img src="${item.src}" id="${item.src}" 
                        onClick={${post_web_message}("hide")}>`
                    )
                    .join("")}
                  </body>
                  </html>
                  `,
            } */}
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
