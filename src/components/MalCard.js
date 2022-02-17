import { View, Text, Dimensions, StyleSheet, Image } from "react-native";
import React from "react";
import { TouchableRipple } from "react-native-paper";
import { light_primary_color, main_url } from "./variables";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function MalCard({ node, navigation, route }) {
  const handlePress = async (node) => {
    // console.log(JSON.stringify(node, null, 2));
    const { title, alternative_titles } = node;
    const { synonyms, en } = alternative_titles;
    const data = await fetch(`${main_url}/search/${en || title}`);
    const json = await data.json();
    const title_lower = title.toLowerCase();
    const alt_lower = en.toLowerCase();
    const synonym = synonyms.length > 0 ? synonyms[0].toLowerCase() : null;
    const obj = json.find(
      (item) =>
        item.title.toLowerCase().replace(":", "").replace("-", "") ===
          title_lower ||
        alt_lower ||
        synonym
    );
    navigation.navigate("MangaDetails", { item: obj });
  };
  // console.log(JSON.stringify(obj ? obj.title : "not found"));

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
            {node.title}
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
