import { TouchableWithoutFeedback, Animated } from "react-native";
import { Avatar } from "react-native-paper";
import { main_color } from "../../../components/variables";
import { useGetManga } from "./useGetManga";
import React from "react";

export default function SubButton({
  IconSize,
  index,
  toggleAnimation,
  outputRange,
  icon,
  setIsOpen,
  startAnimation,
  onPress,
}) {
  const { manga_id, chapters, title, navigation } = useGetManga();
  const child_size = 55;
  const def_press = () => {
    setIsOpen(false);
    startAnimation();
    navigation.navigate("ChapterPage", {
      chapters: chapters,
      manga_id: manga_id,
      manga_title: title,
      //   index: chapters.length - 1,
      index: index,
    });
  };
  return (
    <TouchableWithoutFeedback
      onPress={() => (onPress ? onPress() : def_press())}
    >
      <Animated.View
        style={{
          transform: [
            {
              translateY: toggleAnimation.interpolate({
                inputRange: [0, 1],
                // outputRange: [140, -20],
                outputRange,
              }),
            },
          ],
          backgroundColor: main_color,
          width: child_size,
          height: child_size,
          borderRadius: 20,
          alignItems: "center",
          justifyContent: "center",
          borderWidth: 2,
          borderColor: "hsla(0, 0%, 100%, 0.60)",
        }}
      >
        <Avatar.Icon
          //   icon="alpha-i"
          icon={icon}
          //   size={50}
          size={IconSize}
          style={{ backgroundColor: "transparent" }}
        />
      </Animated.View>
    </TouchableWithoutFeedback>
  );
}
