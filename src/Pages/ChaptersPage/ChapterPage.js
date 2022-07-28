import React, { useRef, useEffect, useState, useContext } from "react";
import { StyleSheet, View, StatusBar, Text, Image } from "react-native";
import WebView from "react-native-webview";
import ChapterNav from "./Components/ChapterNav";
import ReaderAppbar from "./Components/ReaderAppbar";
import {
  html,
  main_color,
  main_url,
  post_web_message,
  script,
} from "../../components/variables";
import { useAuth } from "../../Hooks/useAuth";
import { useMutation } from "@apollo/client";
import { CREATE_READ_MANGA } from "../../graphql/Mutations";
import axios from "axios";

export default function ChapterPage({ navigation, route }) {
  let { manga, chapters, index } = route.params;

  const [data, setData] = useState([]);

  const [chapter, setChapter] = useState(chapters[index]);
  const [idx, setIndex] = useState(index);
  const [page, setPage] = useState(1);
  const [hide, setHide] = useState(false);

  const [loaded, setLoaded] = useState(false);
  const webViewRef = useRef(null);

  const { token, user } = useAuth();

  const [createReadManga] = useMutation(CREATE_READ_MANGA);

  const fetchChapter = async () => {
    const url = `${main_url}/manga/${
      manga?.manga_details?.manga_id ?? manga.manga_id
    }/${chapter.chap_num}`;
    const response = await axios.get(url);
    setData(response.data);
    setLoaded(true);
  };

  const addToHistory = async () => {
    try {
      const read_date = `${new Date().toLocaleDateString()}, ${new Date().toLocaleTimeString()}`;
      await createReadManga({
        variables: {
          user_id: user.user_id,
          manga_id: manga?.manga_id ?? manga.manga_details.manga_id,
          last_read_chapter: chapter.chap_num,
          read_date,
          title: manga?.title ?? manga.manga_details.title,
          img_url: manga?.img_url ?? manga.manga_details.img_url,
        },
      });
    } catch (error) {
      throw new Error(JSON.stringify(error, null, 2));
    }
  };
  useEffect(() => {
    if (chapter != null) {
      fetchChapter();
      setLoaded(true);
      navigation.setOptions({ title: chapter.chap_title });
      if (token) {
        addToHistory();
      }
    }
  }, [chapter]);

  const onMessage = (e) => {
    const value = e.nativeEvent.data;
    if (value === "hide") {
      setHide(!hide);
    }
    if (value.includes("scroll")) {
      const pageNum = value.split("scroll")[1];
      setPage(pageNum);
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
            onTouchMove={() => setHide(true)}
            nestedScrollEnabled={true}
            scalesPageToFit={true}
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
                    <div style="
                        display:flex;
                        justify-content:center;
                        align-items:center;
                        flex-direction:column;
                        width:100%;
                        background-color:black;
                        height:20vh;
                        color:white">
                      <div>
                       <h1>End of the ${chapter.chap_title}</h1>
                      </div>
                      ${
                        chapters.length - idx < chapters.length
                          ? `
                          <div>
                            <h1 style="color:white">
                              Start of the ${chapters[idx - 1].chap_title}
                            </h1>
                          </div>
                          `
                          : ""
                      }
                    </div>
                    ${script}
                  </body>
                  </html>
                  `,
            }}
          />
        </View>
      )}
      <View
        style={{
          width: "100%",
          position: "absolute",
          justifyContent: "center",
          alignItems: "center",
          bottom: 0,
        }}
      >
        <View
          style={{
            backgroundColor: "hsla(0, 0%, 0%, 0.21)",
            borderRadius: 5,
            padding: 10,
          }}
        >
          <Text
            style={{ fontSize: 15, color: "white", textAlign: "center" }}
          >{`${page}/${data.length}`}</Text>
        </View>
      </View>
      <ChapterNav
        setChapter={setChapter}
        setIndex={setIndex}
        idx={idx}
        navigation={navigation}
        chapters={chapters}
        hide={hide}
      />
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
