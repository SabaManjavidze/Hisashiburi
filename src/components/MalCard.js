import { View, Text, Dimensions, StyleSheet, Image } from "react-native";
import React from "react";
import { TouchableRipple } from "react-native-paper";
import { light_primary_color, main_url } from "./variables";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function MalCard({ node, navigation, route }) {
  function removePunctuation(string) {
    let regex = /[^a-zA-Z0-9]/g;
    return string.toLowerCase().replace(regex, "");
  }
  const handlePress = async (node) => {
    const alt_titles = node.alternative_titles;
    const title = removePunctuation(node.title);
    const en = removePunctuation(alt_titles.en);
    const synonym =
      alt_titles.synonyms.length > 0
        ? removePunctuation(alt_titles.synonyms[0])
        : "";
    const data = await fetch(
      `${main_url}/search/${node.title || alt_titles.en}`
    );
    const json = await data.json();
    json.map((item) => {
      const str = removePunctuation(item.title);
      const item_title = str;
      if (item_title === title || item_title === en || item_title === synonym) {
        navigation.navigate("MangaDetails", {
          item: item,
        });
      }
    });
  };

  return (
    <TouchableRipple
      style={{ width: "50%", alignItems: "center", marginTop: 25 }}
      onPress={() => handlePress(node)}
    >
      <View
        style={{
          width: "90%",
          height: windowHeight * 0.4,
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
    </TouchableRipple>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    height: windowHeight * 0.4,
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
