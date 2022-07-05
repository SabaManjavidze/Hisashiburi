import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useGetManga } from "../../../Hooks/useGetManga";
import { styles } from "./ModalStyles";
import HorizontalPicker from "@vseslav/react-native-horizontal-picker";
import { LinearGradient } from "expo-linear-gradient";

export default function ProgressView({ setProgress, progress, lastChapIdx }) {
  const LN_SIDE_COLOR = "rgba(0,0,0,0.8)";
  const LN_CENTER_COLOR = "#0B5FA500";
  const { chapters } = useGetManga();

  const pickerRenderItem = (item, index) => (
    <View
      style={{
        width: 50,
        height: 50,
        // borderWidth: 1,
        // borderColor: "blue",
        justifyContent: "center",
      }}
      key={item.chap_num}
    >
      <Text
        style={{
          color: "white",
          fontSize: 15,
          textAlign: "center",
        }}
      >
        {item.chap_num}
      </Text>
    </View>
  );
  return (
    <View style={[styles.ProgressView]}>
      <View style={styles.ViewLabel}>
        <Text style={styles.ViewLabelText}>Progress</Text>
        <Text style={styles.ViewLabelText}>
          {progress}/
          {chapters !== null && chapters.length > 0 && chapters[0].chap_num}
        </Text>
      </View>
      <View>
        <HorizontalPicker
          data={chapters}
          defaultIndex={lastChapIdx || chapters.length - 1}
          animatedScrollToDefaultIndex
          onChange={(index) => {
            setProgress(chapters[index].chap_num);
          }}
          renderItem={pickerRenderItem}
          itemWidth={50}
          snapTimeout={700}
        />
        <LinearGradient
          pointerEvents="none"
          style={{
            ...StyleSheet.absoluteFillObject,
          }}
          colors={[LN_SIDE_COLOR, LN_CENTER_COLOR, LN_SIDE_COLOR]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        />
      </View>
    </View>
  );
}
