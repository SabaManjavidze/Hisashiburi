import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { StyleSheet, Dimensions, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import {
  light_primary_color,
  main_color,
  primary_color,
} from "../../../components/variables";

const windowWidth = Dimensions.get("window").width;

export default function NavBar({ chapters, setChap, setIndex, idx, style }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(chapters[idx].chap_title);
  const [items, setItems] = useState(chapters);

  const itemSelected = (item) => {
    setValue(item.chap_title);
    const index = chapters.indexOf(item);
    setChap(item);
    setIndex(index);
  };

  useEffect(() => {
    setValue(chapters[idx].chap_title);
  }, [idx]);

  return (
    <DropDownPicker
      open={open}
      value={value}
      schema={{
        label: "chap_title",
        selectable: true,
        value: "chap_title",
      }}
      placeholderStyle={{ color: "#BB86FC" }}
      labelStyle={{ color: "#BB86FC", fontWeight: "bold" }}
      items={items}
      style={[styles.dropDown, style]}
      onSelectItem={(item) => {
        itemSelected(item);
      }}
      theme={"DARK"}
      listMode="MODAL"
      setOpen={setOpen}
      listItemContainerStyle={{
        backgroundColor: "#211B3A",
      }}
      selectedItemContainerStyle={{
        backgroundColor: "#2e235c",
      }}
      modalContentContainerStyle={{ backgroundColor: "#211B3A" }}
      modalProps={{
        presentationStyle: "overFullScreen",
        transparent: true,
      }}
      searchable
      listItemLabelStyle={{ color: "white" }}
      placeholder={"Berserk " + value}
      setItems={setItems}
      itemKey={"chap_num"}
    />
  );
}
const styles = StyleSheet.create({
  dropDown: {
    borderWidth: 0,
    maxWidth: windowWidth,
    backgroundColor: main_color,
  },
});
