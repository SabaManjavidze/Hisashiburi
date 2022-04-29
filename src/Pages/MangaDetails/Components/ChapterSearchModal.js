import { View, Text, FlatList, TouchableOpacity, Modal } from "react-native";
import React, { useState } from "react";
import {
  light_primary_color,
  secondary_color,
  transp_main_color,
} from "../../../components/variables";
import { Avatar, TextInput } from "react-native-paper";
import ChapterItem from "./ChapterItem";
import { useGetManga } from "../MangaDetails";

export default function ChapterSearchModal({ setModalVisible, modalVisible }) {
  const [filtered_chapters, setFilteredChapters] = useState([]);
  const [input, setInput] = useState("");
  const { navigation, chapters, manga_id, title } = useGetManga();

  const onSubmit = () => {
    const index = chapters.findIndex((child) => child.chapter_num === input);
    if (index == -1) {
      alert("Chapter Not Found");
      return;
    }
    if (input.length > 0) {
      navigation.navigate("ChapterPage", {
        chapters: chapters,
        manga_id: manga_id,
        manga_title: title,
        index: index,
      });
    }
    setModalVisible(false);
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View
        style={{
          flex: 1,
          alignItems: "center",
          backgroundColor: "rgba(40, 42, 65, 0.70)",
        }}
      >
        <View style={{ marginTop: 30 }}>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-around",
              height: "5%",
            }}
          >
            <View
              style={{
                justifyContent: "center",
                width: "20%",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => setModalVisible(false)}
              >
                <Avatar.Icon
                  icon={"arrow-left"}
                  size={40}
                  style={{ backgroundColor: "transparent" }}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                justifyContent: "flex-start",
                alignItems: "center",
                flexDirection: "row",
                width: "80%",
              }}
            >
              <TextInput
                placeholder="Enter Chapter Number/Title"
                style={{
                  borderRadius: 20,
                  width: "90%",
                }}
                mode="outlined"
                theme={{
                  colors: {
                    background: secondary_color,
                    text: "white",
                    placeholder: "rgba(211, 211, 222, 0.78)",
                    primary: light_primary_color,
                  },
                }}
                outlineColor={"#283175"}
                onChangeText={(text) => {
                  setInput(text);
                  if (text.length > 0) {
                    setFilteredChapters(
                      chapters.filter((child) =>
                        child.chapter_num.includes(text)
                      )
                    );
                  } else {
                    setFilteredChapters([]);
                  }
                }}
                blurOnSubmit
                onSubmitEditing={() => {
                  onSubmit();
                }}
                autoFocus
              />
              <TouchableOpacity
                onPress={() => onSubmit()}
                style={{
                  position: "absolute",
                  height: 40,
                  right: 45,
                  bottom: 0,
                  top: -5,
                  zIndex: 1,
                }}
              >
                <Avatar.Icon
                  icon={"magnify"}
                  size={40}
                  color={"white"}
                  style={{
                    backgroundColor: "transparent",
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              flex: 1,
            }}
          >
            <FlatList
              data={filtered_chapters}
              style={{ height: "100%", width: "100%", marginTop: 35 }}
              contentContainerStyle={{
                flexDirection: "column",
                paddingBottom: 35,
                alignItems: "center",
              }}
              renderItem={({ item }) => {
                const index = chapters.findIndex(
                  (child) => child.chapter_num === item.chapter_num
                );
                return (
                  <ChapterItem
                    child={item}
                    navigation={navigation}
                    // manga_id={manga_id}
                    // manga_title={manga_title}
                    // chapters={chapters}
                    index={index}
                  />
                );
              }}
              keyExtractor={(item) => item.chap_title}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}
