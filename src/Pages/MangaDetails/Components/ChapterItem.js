import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { primary_color, secondary_color } from "../../../components/variables";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function ChapterItem({
  navigation,
  manga_id,
  chapters,
  child,
  index,
}) {
  return (
    <View style={styles.chapter_container}>
      <TouchableOpacity
        style={{ width: "100%" }}
        activeOpacity={0.7}
        onPress={() =>
          navigation.navigate("ChapterPage", {
            index: index,
            manga_id: manga_id,
            chapters: chapters,
          })
        }
      >
        <View style={{ maxWidth: "75%", marginBottom: 15 }}>
          <Text style={{ fontSize: 18, color: "white", textAlign: "center" }}>
            {child.chap_title}
          </Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text
            style={{
              fontSize: 13,
              color: "rgba(255, 255, 255, 0.5)",
              textAlign: "center",
            }}
          >
            {`views : ${child.view_count}`}
          </Text>
          <Text
            style={{
              fontSize: 13,
              color: "rgba(255, 255, 255, 0.5)",
              textAlign: "center",
            }}
          >
            {`upload date : ${child.upload_date}`}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  chapter_container: {
    backgroundColor: "#1C1F3A",
    borderRadius: 20,
    marginBottom: 15,
    padding: 10,
    borderColor: primary_color,
    borderWidth: 1,
    width: windowWidth * 0.9,
  },
});
