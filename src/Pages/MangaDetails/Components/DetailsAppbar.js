import { View, Text } from "react-native";
import React from "react";
import { Appbar } from "react-native-paper";
import { main_color } from "../../../components/variables";

export default function DetailsAppbar({ navigation, title }) {
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
      <Appbar.Content title={title} />
    </Appbar.Header>
  );
}
