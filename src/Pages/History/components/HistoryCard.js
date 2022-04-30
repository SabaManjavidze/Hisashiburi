import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from "react-native";
import { IconButton, TouchableRipple } from "react-native-paper";
import { domain, img_url, primary_color } from "../../../components/variables";
import { fetchData } from "../../../utils/fetchData";

const { width, height } = Dimensions.get("window");

export default function HistoryCard({ route, navigation, item }) {
  //   console.log(item);
  const {
    manga_details: { title, manga_id },
    read_date,
    last_read_chapter,
  } = item;

  const goToChapter = async () => {
    const { chapters } = await fetchData(manga_id);
    const i = chapters.findIndex((chap) => chap.chap_num == last_read_chapter);
    navigation.navigate("ChapterPage", {
      chapters: chapters,
      manga_id: manga_id,
      manga_title: title,
      index: i,
    });
  };

  return (
    <View style={[{ height: height * 0.25 }, styles.container]} key={manga_id}>
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
              //   uri: img_url ? img_url : `${domain}${img_url}${manga_id}.jpg`,
              uri: `${domain}${img_url}${manga_id}.jpg`,
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
          {last_read_chapter && (
            <View
              style={{
                flex: 1,
                width: "100%",
                height: "60%",
              }}
            >
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
                      {last_read_chapter}
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
                    {read_date}
                  </Text>
                </View>
              </View>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    width: width - 20,
    backgroundColor: "#2F2C4B",
    borderRadius: 10,
    flexDirection: "row",
    borderColor: primary_color,
    borderWidth: 2,
    padding: 10,
  },
  image: {
    width: 115,
    height: 170,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  title: {
    color: "white",
    maxWidth: width / 4,
  },
});
