import { View, Text } from "react-native";
import React, { useRef, useState } from "react";
import {
  light_primary_color,
  main_color,
  primary_color,
  transp_main_color,
  secondary_color,
} from "../../components/variables";
import { Appbar, List } from "react-native-paper";
import FadeView from "./FadeView";
import NavBar from "../../../NavBar";

export default function ReaderAppbar({
  navigation,
  route,
  chapters,
  setChap,
  idx,
  hide,
  setIndex,
}) {
  return (
    <FadeView
      style={{
        flex: 1,
        position: "absolute",
        width: "100%",
        top: 0,
        zIndex: 1,
      }}
      active={hide}
      animationDuration={150}
    >
      <View
        style={{
          flex: 1,
          // backgroundColor: main_color,
          borderBottomColor: "black",
          borderBottomWidth: 0.7,
        }}
      >
        <Appbar.Header
          style={{
            borderWidth: 0,
            backgroundColor: transp_main_color,
            elevation: 0,
          }}
        >
          <Appbar.BackAction
            onPress={navigation.goBack}
            color={primary_color}
            size={26}
            style={{ marginRight: 0 }}
          />
          <View style={{ width: "70%" }}>
            <NavBar
              chapters={chapters}
              setIndex={setIndex}
              setChap={setChap}
              idx={idx}
              style={{
                width: "100%",
                backgroundColor: transp_main_color,
              }}
            />
          </View>
          <Appbar.Action
            icon={"bookmark"}
            size={24}
            onPress={() => {
              // console.log("bookmark");
            }}
            style={{ left: 15 }}
            color={primary_color}
          />
        </Appbar.Header>
      </View>
    </FadeView>
  );
}
