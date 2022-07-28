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
import { logOut } from "../Services/MalServices";
import {
  domain,
  img_endpoint,
  light_primary_color,
  NOT_FOUND_IMAGE,
  primary_color,
} from "../components/variables";
import { fetchData } from "../utils/fetchData";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function MangaCard({ route, navigation, item }) {
  const goToChapter = async (i) => {
    const { chapters } = await fetchData(item.manga_id);
    navigation.navigate("ChapterPage", {
      chapters: chapters,
      manga: item,
      index: i,
    });
  };

  const mangaImage = item.img_url
    ? item.img_url
    : `${domain}${img_endpoint}${item.manga_id}.jpg`;
  const [image, setImage] = useState(mangaImage);

  return (
    <View
      style={[{ height: windowHeight * 0.25 }, styles.container]}
      key={item.manga_id}
    >
      <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("MangaDetails", {
              item: item,
            })
          }
        >
          <Image
            source={{
              uri: image,
            }}
            onError={() => {
              setImage(NOT_FOUND_IMAGE);
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
                {item.title.length > 50
                  ? `${item.title.substring(0, 45)}...`
                  : item.title}
              </Text>
            </View>
          </View>
          {item.chapters && (
            <View
              style={{
                flex: 1,
                width: "100%",
                height: "60%",
              }}
            >
              {item.chapters.map((child, i) => {
                return (
                  <View
                    key={i}
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginHorizontal: 0,
                    }}
                  >
                    <View style={{ flex: 3, alignItems: "center" }}>
                      {child.chap_title ? (
                        <TouchableRipple
                          onPress={() => goToChapter(i)}
                          rippleColor={light_primary_color}
                          style={{
                            borderColor: primary_color,
                            borderWidth: 0.4,
                            width: "80%",
                            alignItems: "center",
                          }}
                        >
                          <Text
                            style={{
                              color: primary_color,
                              textAlign: "center",
                              fontSize: 13,
                            }}
                          >
                            {child.chap_title.length > 18
                              ? `${child.chap_title.substring(0, 18)}...`
                              : child.chap_title}
                          </Text>
                        </TouchableRipple>
                      ) : (
                        <View
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "100%",
                            marginLeft: 50,
                          }}
                        >
                          <Text
                            style={{
                              color: "white",
                              textAlign: "center",
                            }}
                          >
                            There are no chapters
                          </Text>
                        </View>
                      )}
                    </View>
                    <View style={{ flex: 1, justifyContent: "center" }}>
                      <Text
                        style={{
                          color: "gray",
                          fontSize: 10,
                          textAlign: "center",
                        }}
                      >
                        {child.upload_date}
                      </Text>
                    </View>
                  </View>
                );
              })}
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
    width: windowWidth - 20,
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
    maxWidth: windowWidth / 4,
  },
});
