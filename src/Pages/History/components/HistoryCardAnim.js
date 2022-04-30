import { View, Text, Dimensions, StyleSheet } from "react-native";
import React, { useState } from "react";
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { IconButton } from "react-native-paper";
import { light_primary_color } from "../../../components/variables";
import { PanGestureHandler } from "react-native-gesture-handler";
import HistoryCard from "./HistoryCard";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function HistoryCardAnim({
  item,
  simultHandler,
  route,
  navigation,
  onDismiss,
}) {
  const translateX = useSharedValue(0);
  const opacity = useSharedValue(1);
  const itemHeight = useSharedValue(windowHeight * 0.25);
  const TRANSLATE_X_THRESHOLD = -windowWidth * 0.2;
  const panGesture = useAnimatedGestureHandler({
    onActive: (event) => {
      translateX.value = event.translationX;
    },
    onEnd: () => {
      const dissmised = translateX.value <= TRANSLATE_X_THRESHOLD;
      if (dissmised) {
        translateX.value = withTiming(-windowWidth);
        itemHeight.value = withTiming(0);
        runOnJS(onDismiss)(item.manga_details.manga_id);
      } else {
        translateX.value = withTiming(0);
      }
    },
  });
  const rContainerStyle = useAnimatedStyle(() => {
    return {
      height: itemHeight.value,
      opacity: opacity.value,
    };
  });
  const rStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: translateX.value,
      },
    ],
  }));
  const rIconContainerStyle = useAnimatedStyle(() => {
    const opacity = withTiming(translateX.value < -windowWidth * 0.1 ? 1 : 0);
    return { opacity, height: itemHeight.value };
  });
  return (
    <Animated.View style={[styles.container, rContainerStyle]}>
      <Animated.View style={[styles.delete_container, rIconContainerStyle]}>
        <IconButton
          icon="delete-outline"
          color={light_primary_color}
          size={itemHeight.value == 0 ? 0 : 40}
          style={{
            opacity: opacity.value,
            // height:"100%",
            // alignItems: "center",
            // justifyContent: "center",
          }}
        />
      </Animated.View>
      <PanGestureHandler
        simultaneousHandlers={simultHandler}
        onGestureEvent={panGesture}
        hitSlop={{ width: 70, right: 0 }}
      >
        <Animated.View style={[styles.task, rStyle]}>
          <HistoryCard item={item} route={route} navigation={navigation} />
        </Animated.View>
      </PanGestureHandler>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginVertical: 10,
    alignItems: "center",
  },
  delete_container: {
    position: "absolute",
    height: "90%",
    right: "5%",
    width: "15%",
    justifyContent: "center",
    alignItems: "center",
  },
  task: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 115,
    height: 170,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
});
