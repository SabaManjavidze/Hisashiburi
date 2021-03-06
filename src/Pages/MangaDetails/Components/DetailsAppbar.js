import { View, Text } from "react-native";
import React from "react";
import { Appbar } from "react-native-paper";
import { main_color } from "../../../components/variables";
import { useGetManga } from "../../../Hooks/useGetManga";

export default function DetailsAppbar() {
  const { manga, navigation } = useGetManga();
  return (
    <Appbar.Header
      style={{
        width: "100%",
        backgroundColor: main_color,
        alignItems: "center",
      }}
    >
      <Appbar.Action
        icon="arrow-left"
        style={{ marginRight: 20 }}
        onPress={() => {
          navigation.goBack();
        }}
      />
      <Appbar.Content title={manga.title} />
    </Appbar.Header>
  );
}
