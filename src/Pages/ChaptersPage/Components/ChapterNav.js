import {
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import {
  primary_color,
  main_color,
  transp_main_color,
} from "../../../components/variables";
import FadeView from "./FadeView";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function ChapterNav({
  setIndex,
  idx,
  chapters,
  navigation,
  hide,
}) {
  return (
    <FadeView
      style={{
        flex: 1,
        position: "absolute",
        width: "100%",
        bottom: 0,
        zIndex: 1,
      }}
      active={hide}
      animationDuration={150}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "space-between",
          flexDirection: "row",
          backgroundColor: transp_main_color,
          alignItems: "flex-start",
          height: windowHeight * 0.08,
        }}
      >
        <TouchableOpacity
          style={styles.prev_btn}
          activeOpacity={0.7}
          onPress={() => {
            const prev = idx + 1;
            if (chapters[prev] != null) {
              setIndex(prev);
            } else {
              navigation.goBack();
            }
          }}
        >
          <Text style={{ color: "white" }}>Previous</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.next_btn}
          activeOpacity={0.7}
          onPress={() => {
            const next = idx - 1;
            if (chapters[next] != null) {
              setIndex(next);
            } else {
              navigation.goBack();
            }
          }}
        >
          <Text style={{ color: "white" }}>Next</Text>
        </TouchableOpacity>
      </View>
    </FadeView>
  );
}
const styles = StyleSheet.create({
  prev_btn: {
    width: windowWidth * 0.35,
    height: "60%",
    margin: 10,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EA3128",
  },
  next_btn: {
    width: windowWidth * 0.35,
    height: "60%",
    margin: 10,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: primary_color,
  },
});
