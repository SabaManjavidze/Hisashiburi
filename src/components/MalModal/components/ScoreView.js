import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { styles } from "./ModalStyles";
import HorizontalPicker from "@vseslav/react-native-horizontal-picker";
import { LinearGradient } from "expo-linear-gradient";

export default function ScoreView({ score, setScore }) {
  const LN_SIDE_COLOR = "rgba(0,0,0,0.8)";
  const LN_CENTER_COLOR = "#0B5FA500";
  return (
    <View style={[styles.ScoreView]}>
      <View style={styles.ViewLabel}>
        <Text style={styles.ViewLabelText}>Score</Text>
        <Text style={styles.ViewLabelText}>{score}</Text>
      </View>
      <View>
        <HorizontalPicker
          data={["-", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]}
          defaultIndex={score > 0 && score}
          animatedScrollToDefaultIndex
          onChange={(item, index) => {
            setScore(item);
          }}
          renderItem={(item, index) => (
            <View
              style={{
                width: 50,
                height: 50,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "white", fontSize: 15 }}>{item}</Text>
            </View>
          )}
          itemWidth={50}
          snapTimeout={520}
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
