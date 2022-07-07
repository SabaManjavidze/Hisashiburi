import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from "react-native";
import {
  ActivityIndicator,
  IconButton,
  TouchableRipple,
} from "react-native-paper";
import { domain, img_url, primary_color } from "../../../components/variables";
import { fetchData } from "../../../utils/fetchData";

const { width, height } = Dimensions.get("window");

export default function HistoryCard({ route, navigation, item }) {
  //   console.log(item);
  const [chapIdx, setChapIdx] = useState();
  const [chapters, setChapters] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const MAX_CHAP_TITLE_LENGTH = 27;
  const {
    manga_details: { title, manga_id, img_url },
    read_date,
    last_read_chapter,
  } = item;
  const fetchChapters = async () => {
    const { chapters } = await fetchData(manga_id);
    const idx = chapters.findIndex(
      (chap) => chap.chap_num == last_read_chapter
    );
    setChapters(chapters);
    setChapIdx(idx);
    setLoaded(true);
  };
  useEffect(() => {
    fetchChapters();
  }, []);

  const goToChapter = async () => {
    navigation.navigate("ChapterPage", {
      chapters: chapters,
      manga: item,
      index: chapIdx,
    });
  };

  return (
    <View style={[{ height: height * 0.2 }, styles.container]} key={manga_id}>
      <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("MangaDetails", {
              item: { manga_id, title },
            })
          }
        >
          <Image
            source={{
              uri: img_url ? img_url : `${domain}${img_url}${manga_id}.jpg`,
              // uri: `${domain}${img_url}${manga_id}.jpg`,
            }}
            style={styles.image}
          />
        </TouchableOpacity>

        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              flex: 1,
              width: "100%",
              justifyContent: "space-between",
              height: "40%",
              flexDirection: "row",
            }}
          >
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                width: "90%",
              }}
            >
              <Text
                style={{ color: "white", textAlign: "center", maxWidth: "80%" }}
              >
                {title.length > 50 ? `${title.substring(0, 45)}...` : title}
              </Text>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              width: "100%",
              height: "60%",
            }}
          >
            {loaded ? (
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginHorizontal: 0,
                }}
              >
                <View style={{ flex: 3, alignItems: "center" }}>
                  <TouchableRipple
                    onPress={() => goToChapter()}
                    style={{
                      borderColor: primary_color,
                      borderWidth: 1,
                      borderRadius: 5,
                      width: "80%",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        color: primary_color,
                        textAlign: "center",
                        fontSize: 18,
                      }}
                    >
                      {chapters[chapIdx].chap_title.length >
                      MAX_CHAP_TITLE_LENGTH
                        ? `${chapters[chapIdx].chap_title.slice(
                            0,
                            MAX_CHAP_TITLE_LENGTH
                          )}...`
                        : chapters[chapIdx].chap_title}
                    </Text>
                  </TouchableRipple>
                </View>
                <View style={{ flex: 1, justifyContent: "center" }}>
                  <Text
                    style={{
                      color: "gray",
                      fontSize: 10,
                      textAlign: "center",
                    }}
                  >
                    {new Date(read_date).toLocaleDateString()}
                  </Text>
                </View>
              </View>
            ) : (
              // <View
              //   style={{
              //     // backgroundColor: "black",
              //     display: "flex",
              //     justifyContent: "center",
              //     alignItems: "center",
              //     flex: 1,
              //     width: "100%",
              //     marginBottom: 10,
              //   }}
              // >
              <ActivityIndicator size="small" />
              // </View>
            )}
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // marginVertical: 5,
    width: width - 20,
    backgroundColor: "#2F2C4B",
    borderRadius: 10,
    flexDirection: "row",
    borderColor: primary_color,
    borderWidth: 2,
  },
  image: {
    width: 110,
    height: 150,
    marginLeft: 10,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  title: {
    color: "white",
    maxWidth: width / 4,
  },
});
