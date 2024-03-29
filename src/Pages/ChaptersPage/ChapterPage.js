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
  primary_color,
  script,
} from "../../components/variables";
import { useAuth } from "../../Hooks/useAuth";
import { useMutation } from "@apollo/client";
import { CREATE_READ_MANGA } from "../../graphql/Mutations";
import axios from "axios";
import { ActivityIndicator } from "react-native-web";

export default function ChapterPage({ navigation, route }) {
  let { manga, chapters, index } = route.params;

  const [data, setData] = useState([]);

  const [idx, setIndex] = useState(index);
  const [page, setPage] = useState(1);
  const [hide, setHide] = useState(false);
  const [fetching, setFetching] = useState(false);

  const [loaded, setLoaded] = useState(false);
  const webViewRef = useRef(null);

  const { token, user } = useAuth();

  const [createReadManga] = useMutation(CREATE_READ_MANGA);

  const fetchChapter = async () => {
    const url = `${main_url}/manga/${
      manga?.manga_details?.manga_id ?? manga.manga_id
    }/${chapters[idx].chap_num}`;

    const response = await axios.get(url);
    setData([...data, ...response.data]);
    setLoaded(true);
  };

  const addToHistory = async () => {
    try {
      const read_date = `${new Date().toLocaleDateString()}, ${new Date().toLocaleTimeString()}`;
      await createReadManga({
        variables: {
          user_id: user.user_id,
          manga_id: manga?.manga_id ?? manga.manga_details.manga_id,
          last_read_chapter: chapters[idx].chap_num,
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
    if (idx != null) {
      fetchChapter();
      setLoaded(true);
      navigation.setOptions({ title: chapters[idx].chap_title });
      if (token) {
        addToHistory();
      }
    }
  }, [idx]);

  const onMessage = (e) => {
    const value = e.nativeEvent.data;
    if (value === "hide") {
      setHide(!hide);
    }
    if (value.includes("scroll")) {
      const pageNum = value.split("scroll")[1];
      setPage(pageNum);
    }
    if (value.includes("end reached") && !fetching) {
      setIndex(idx - 1);
      setFetching(true);
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
        idx={idx}
        hide={hide}
      />
      <View style={{ flex: 1 }}>
        {loaded ? (
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
                  <div id="img_cont" style="min-height:100vh" onClick={${post_web_message}("hide")}>
                  ${data
                    .map((item) => `<img src="${item.src}" id="${item.src}" />`)
                    .join("")}
                    </div>
                    <footer style="
                        display:flex;
                        justify-content:center;
                        align-items:center;
                        flex-direction:column;
                        width:100%;
                        background-color:black;
                        height:20vh;
                        color:white"
                        id="footer">
                      <div>
                       <h1>End of the ${chapters[idx].chap_title}</h1>
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
                    </footer>
<script>
                    ${script}

</script>
                  </body>
                  </html>
                  `,
            }}
          />
        ) : null}
      </View>
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
