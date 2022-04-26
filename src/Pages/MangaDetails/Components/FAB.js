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
import { useGetManga } from "../MangaDetails";
import SubButton from "./SubButton";

export default function FAB({
  setModalVisible,
  modalVisible,
  navigation,
  // manga_id,
  // chapters,
}) {
  const { manga_id, chapters } = useGetManga();

  const [isOpen, setIsOpen] = useState(false);
  const toggleAnimation = useRef(new Animated.Value(0)).current;

  const startAnimation = () => {
    const toValue = isOpen ? 0 : 1;
    Animated.timing(toggleAnimation, {
      toValue: toValue,
      duration: 170,
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
      <SubButton
        IconSize={50}
        index={0}
        outputRange={[140, -20]}
        navigation={navigation}
        icon={"history"}
        toggleAnimation={toggleAnimation}
        startAnimation={startAnimation}
        setIsOpen={setIsOpen}
      />
      <SubButton
        IconSize={50}
        index={chapters.length - 1}
        navigation={navigation}
        outputRange={[90, -15]}
        icon={"alpha-i"}
        toggleAnimation={toggleAnimation}
        setIsOpen={setIsOpen}
        startAnimation={startAnimation}
      />
      <SubButton
        IconSize={50}
        index={0}
        navigation={navigation}
        outputRange={[50, -10]}
        icon={"roman-numeral-9"}
        toggleAnimation={toggleAnimation}
        setIsOpen={setIsOpen}
        startAnimation={startAnimation}
      />
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
