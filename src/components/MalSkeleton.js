import { View, Animated, StyleSheet, Dimensions } from "react-native";
import React, { useEffect, useRef } from "react";
import {
  boneColor,
  light_primary_color,
  primary_color,
  secondary_color,
} from "./variables";
import SkeletonContent from "react-native-skeleton-content";

const { width, height } = Dimensions.get("window");
export default function MalSkeleton() {
  return (
    <View style={{ width: "50%", alignItems: "center", marginTop: 40 }}>
      <View
        style={{
          width: "90%",
          height: height * 0.4,
          flexDirection: "column",
        }}
      >
        <View style={{ height: "90%" }}>
          <SkeletonContent
            animationDirection="diagonalDownRight"
            // boneColor={"hsla(257, 57%, 50%, 0.69)"}
            boneColor={"transparent"}
            highlightColor={primary_color}
            isLoading={true}
            layout={[styles.container]}
          />
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    height: height * 0.4,
    borderWidth: 1,
    borderColor: primary_color,
    // backgroundColor: primary_color,
  },
  image: {
    // width: "100%",
    marginTop: 40,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    height: height * 0.4,
  },

  title: {
    // backgroundColor: primary_color,
    width: "75%",
    height: 20,
    borderRadius: 5,
  },
});
