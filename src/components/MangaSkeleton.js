import { View, Animated, StyleSheet, Dimensions } from "react-native";
import React, { useEffect, useRef } from "react";
import {
  light_primary_color,
  primary_color,
  secondary_color,
} from "./variables";

const { width, height } = Dimensions.get("window");

export default function MangaSkeleton() {
  const opacity = useRef(new Animated.Value(0.4));
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity.current, {
          toValue: 0.4,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(opacity.current, {
          toValue: 0.7,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [opacity]);
  const initialArr = [1, 2, 3];
  const ChapterSkeleton = () => (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 0,
      }}
    >
      <View style={{ flex: 3.3, alignItems: "center" }}>
        <Animated.View style={[{ opacity: opacity.current }, styles.title]} />
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Animated.View style={[{ opacity: opacity.current }, styles.title]} />
      </View>
    </View>
  );

  return (
    <Animated.View style={[{ opacity: opacity.current }, styles.container]}>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <Animated.View style={[{ opacity: opacity.current }, styles.image]} />
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <View
            style={{
              flex: 1,
              width: "100%",
              justifyContent: "center",
              height: "40%",
              flexDirection: "row",
            }}
          >
            <Animated.View
              style={[
                { opacity: opacity.current, marginTop: 40 },
                styles.title,
              ]}
            />
          </View>
          <View
            style={{
              flex: 1,
              width: "100%",
              height: "60%",
            }}
          >
            {initialArr.map((child) => {
              return <ChapterSkeleton key={child} />;
            })}
          </View>
        </View>
      </View>
    </Animated.View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    width: width - 20,
    height: height * 0.25,
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
    backgroundColor: primary_color,
  },

  title: {
    backgroundColor: primary_color,
    width: "75%",
    height: 20,
    borderRadius: 5,
  },
});
