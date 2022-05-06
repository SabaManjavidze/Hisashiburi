import { gql, useQuery } from "@apollo/client";
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
import { useAuth } from "../../../Hooks/useAuth";
import SubButton from "./SubButton";
import { useGetManga } from "../../../Hooks/useGetManga";
import { GET_READ_MANGA } from "../../../graphql/Queries";

export default function FAB({ setModalVisible, modalVisible }) {
  const { navigation, chapters, manga_id, title } = useGetManga();
  const { user, token } = useAuth();
  const { data, loading, error } = useQuery(GET_READ_MANGA, {
    variables: { user_id: user ? user.id : null, manga_id: manga_id },
  });
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
  // useEffect(() => {
  //   if (!loading) {
  //     console.log(data.getReadManga.length);
  //   }
  // }, [loading]);

  return (
    <View
      style={{
        position: "absolute",
        zIndex: 1,
        alignItems: "center",
        justifyContent: "center",
        bottom: 20,
        right: 25,
      }}
    >
      {token && !loading && data.getReadManga.length > 0 ? (
        <SubButton
          IconSize={50}
          index={0}
          outputRange={[170, -20]}
          icon={"history"}
          toggleAnimation={toggleAnimation}
          startAnimation={startAnimation}
          setIsOpen={setIsOpen}
          onPress={() => {
            if (!loading && data.getReadManga) {
              const index = chapters.findIndex((chapter, i) => {
                if (
                  chapter.chap_num == data.getReadManga[0].last_read_chapter
                ) {
                  return chapters.length - 1 - i;
                }
              });
              // console.log(index);
              // console.log(data.getReadManga[0].last_read_chapter);
              navigation.navigate("ChapterPage", {
                chapters: chapters,
                manga_id: manga_id,
                manga_title: title,
                index: index,
              });
            }
          }}
        />
      ) : null}
      <SubButton
        IconSize={50}
        index={0}
        outputRange={[115, -15]}
        icon={"roman-numeral-9"}
        toggleAnimation={toggleAnimation}
        setIsOpen={setIsOpen}
        startAnimation={startAnimation}
      />
      <SubButton
        IconSize={50}
        index={chapters.length - 1}
        outputRange={[60, -10]}
        icon={"alpha-i"}
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
            width: 65,
            height: 65,
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
