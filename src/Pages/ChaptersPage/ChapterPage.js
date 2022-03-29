import React, { useRef, useEffect, useState, useContext } from "react";
import { StyleSheet, View, StatusBar } from "react-native";
import WebView from "react-native-webview";
import ChapterNav from "./Components/ChapterNav";
import ReaderAppbar from "./Components/ReaderAppbar";
import { html, main_color, main_url } from "../../components/variables";

export default function ChapterPage({ navigation, route }) {
  const { manga_id, chapters, index } = route.params;
  const [data, setData] = useState([]);

  const [chapter, setChapter] = useState(chapters[index]);
  const [idx, setIndex] = useState(index);
  const [hide, sethide] = useState(false);

  const [loaded, setLoaded] = useState(false);
  const scroll_ref = useRef(null);

  const fetchData = async () => {
    const url = `${main_url}/manga/${manga_id}/${chapter.chapter_num}`;
    const data = await fetch(url);
    const json = await data.json();
    setData(json);
    setLoaded(true);
  };

  useEffect(() => {
    if (chapter != null) {
      fetchData();
      navigation.setOptions({ title: chapter.chap_title });

      if (loaded && scroll_ref != null && scroll_ref.current != null) {
        scroll_ref.current.scrollToOffset({ animated: true, offset: 0 });
      }
    }
  }, [chapter]);
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
