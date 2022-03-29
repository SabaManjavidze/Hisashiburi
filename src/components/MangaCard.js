import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  AsyncStorage,
} from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import { IconButton, TouchableRipple } from "react-native-paper";
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { fetchData } from "../Pages/MangaDetails/MangaDetails";
import {
  addToFavorites,
  checkIfFavorited,
  removeFromFavorites,
} from "../Services/FavServices";
import { logOut } from "../Services/MalServices";
import {
  domain,
  img_url,
  light_primary_color,
  primary_color,
} from "../components/variables";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function MangaCard({ route, navigation, item }) {
  const [fav, setfav] = useState(false);
  const [star, setstar] = useState(not_fav_icon);

  const goToChapter = async (i) => {
    const { chapters } = await fetchData(item.manga_id);
    navigation.navigate("ChapterPage", {
      chapters: chapters,
      manga_id: item.manga_id,
      index: i,
    });
  };

  const fav_icon = "star";
  const not_fav_icon = "star-outline";

  const onPress = async () => {
    await logOut();
    navigation.navigate("Auth");
  };

  const atHome = route.name == "Home";
  return (
    <View
      style={[
        { height: atHome ? windowHeight * 0.25 : "100%" },
        styles.container,
      ]}
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
              uri: item.img_url
                ? item.img_url
                : `${domain}${img_url}${item.manga_id}.jpg`,
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
              justifyContent: atHome ? "space-between" : "center",
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
            {atHome && (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "flex-start",
                  height: "100%",
                  width: "10%",
                }}
              >
                <IconButton
                  icon={star}
                  style={{ bottom: 10 }}
                  onPress={() => onPress()}
                  color={primary_color}
                />
              </View>
            )}
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
                      <TouchableRipple
                        onPress={() => goToChapter(i)}
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
