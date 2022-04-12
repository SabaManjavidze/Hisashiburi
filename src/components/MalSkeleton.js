import { View, Animated, StyleSheet, Dimensions } from "react-native";
import React, { useEffect, useRef } from "react";
import {
  light_primary_color,
  primary_color,
  secondary_color,
} from "./variables";

const { width, height } = Dimensions.get("window");
export default function MalSkeleton() {
  const opacity = useRef(new Animated.Value(0.4));
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity.current, {
          toValue: 0.4,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(opacity.current, {
          toValue: 0.7,
          duration: 300,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [opacity]);

  return (
    <View style={{ width: "50%", alignItems: "center", marginTop: 25 }}>
      <View
        style={{
          width: "90%",
          height: height * 0.4,
          flexDirection: "column",
        }}
      >
        <View style={{ height: "90%" }}>
          <Animated.View
            style={[{ opacity: opacity.current }, styles.container]}
          />
        </View>
        {/* <Animated.View style={[{ opacity: opacity.current }, styles.image]} /> */}
        {/* </Animated.View> */}
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
    backgroundColor: primary_color,
  },
  image: {
    // width: "100%",
    marginTop: 40,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    height: height * 0.4,
  },

  title: {
    backgroundColor: primary_color,
    width: "75%",
    height: 20,
    borderRadius: 5,
  },
});
