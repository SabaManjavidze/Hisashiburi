import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { TouchableRipple } from "react-native-paper";
import { mal_dict, main_url } from "./variables";

const { height, width } = Dimensions.get("window");

export default function MalCard({ node, navigation, route }) {
  const { text, color } = node.my_list_status
    ? mal_dict[node.my_list_status.status]
    : { text: "", color: "gray" };
  function removePunctuation(string) {
    let regex = /[^a-zA-Z0-9]/g;
    return string.toLowerCase().replace(regex, "");
  }
  const handlePress = async (node) => {
    const alt_titles = node.alternative_titles;
    const title = removePunctuation(node.title);
    // console.log(title);
    const en = removePunctuation(alt_titles.en);
    const synonym =
      alt_titles.synonyms.length > 0
        ? removePunctuation(alt_titles.synonyms[0])
        : "";
    const url = `${main_url}/search/${node.title || alt_titles.en}?limit=15`;
    // console.log(url);
    const data = await fetch(url);
    const json = await data.json();
    for (var i = 0; i < json.length; i++) {
      const item = json[i];
      const item_title = removePunctuation(item.title);
      // console.log(item.title);

      if (item_title === title || item_title === en || item_title === synonym) {
        navigation.navigate("MangaDetails", {
          item: item,
          malItem: node,
        });
        return;
      }
    }
  };

  return (
    <TouchableOpacity
      style={{
        width: "45%",
        // height: height * 0.35,
        marginHorizontal: 10,
        alignItems: "center",
        marginTop: 25,
        borderWidth: 3,
        borderColor: color,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
      }}
      activeOpacity={0.8}
      onPress={() => handlePress(node)}
    >
      <View
        style={{
          width: "100%",
          height: height * 0.4,
          flexDirection: "column",
        }}
      >
        <View style={{ height: "90%" }}>
          <Image
            source={{ uri: node.main_picture.large }}
            style={styles.image}
          />
        </View>
        <View style={{ height: "10%", justifyContent: "center" }}>
          <View style={styles.titleContainer}></View>
          <Text style={{ color: "white", textAlign: "center" }}>
            {node.title.length > 40
              ? `${node.title.substring(0, 35)}...`
              : node.title}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    height: height * 0.4,
    resizeMode: "cover",
  },
  titleContainer: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    height: "100%",
    width: "100%",
    backgroundColor: "black",
    opacity: 0.5,
    position: "absolute",
  },
});
