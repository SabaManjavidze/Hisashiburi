import React, { useEffect, useRef, useState } from "react";
import {
  Text,
  View,
  Animated,
  TouchableWithoutFeedback,
  Vibration,
} from "react-native";
import { Avatar } from "react-native-paper";
import { main_color, primary_color } from "../../../components/variables";

export default function FAB({
  setModalVisible,
  modalVisible,
  manga_id,
  navigation,
  chapters,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleAnimation = useRef(new Animated.Value(0)).current;

  const startAnimation = () => {
    const toValue = isOpen ? 0 : 1;
    Animated.timing(toggleAnimation, {
      toValue: toValue,
      duration: 300,
      useNativeDriver: false,
    }).start();
    setIsOpen(!isOpen);
  };
  const child_size = 45;
  return (
    <View
      style={{
        position: "absolute",
        zIndex: 9999,
        alignItems: "center",
        justifyContent: "center",
        bottom: 20,
        right: 25,
      }}
    >
      <TouchableWithoutFeedback
        onPress={() => {
          navigation.navigate("ChapterPage", {
            chapters: chapters,
            manga_id: manga_id,
            index: chapters.length - 1,
          });
        }}
      >
        <Animated.View
          style={{
            transform: [
              {
                translateY: toggleAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [90, -20],
                }),
              },
            ],
            backgroundColor: main_color,
            width: child_size,
            height: child_size,
            borderRadius: 20,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Avatar.Icon
            icon="alpha-i"
            size={50}
            style={{ backgroundColor: "transparent" }}
          />
        </Animated.View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback
        onPress={() => {
          navigation.navigate("ChapterPage", {
            chapters: chapters,
            manga_id: manga_id,
            index: 0,
          });
        }}
      >
        <Animated.View
          style={{
            backgroundColor: main_color,
            width: child_size,
            height: child_size,
            borderRadius: 20,
            alignItems: "center",
            justifyContent: "center",
            transform: [
              {
                translateY: toggleAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [40, -10],
                }),
              },
            ],
          }}
        >
          <Avatar.Icon
            icon="roman-numeral-9"
            size={50}
            style={{ backgroundColor: "transparent" }}
          />
        </Animated.View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        onPress={() => {
          startAnimation();
        }}
        onLongPress={() => {
          // show modal with input for chapter name
          Vibration.vibrate(70);
          setModalVisible(!modalVisible);
        }}
      >
        <Animated.View
          style={{
            transform: [
              {
                rotate: toggleAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: ["0deg", "180deg"],
                }),
              },
            ],
            backgroundColor: primary_color,
            width: 55,
            height: 55,
            borderRadius: 30,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ color: "#fff", fontSize: 30 }}>+</Text>
        </Animated.View>
      </TouchableWithoutFeedback>
    </View>
  );
}
