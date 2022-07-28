import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { TouchableRipple } from "react-native-paper";
import { styles } from "./ModalStyles";

export default function StatusView({ setStatus, status }) {
  const renderItem = ({ item, index }) => (
    <TouchableRipple
      onPress={() => setStatus(item)}
      style={[
        styles.StatusItem,
        item == status
          ? { backgroundColor: "gray" }
          : { backgroundColor: "transparent" },
      ]}
    >
      <Text
        style={{
          fontSize: 15,
          color: "white",
          textAlign: "center",
        }}
      >
        {item}
      </Text>
    </TouchableRipple>
  );
  return (
    <View style={[styles.StatusView]}>
      <View style={styles.ViewLabel}>
        <Text style={styles.ViewLabelText}>Status</Text>
        <Text style={styles.ViewLabelText}>{status}</Text>
      </View>
      <FlatList
        data={["Reading", "Completed", "Plan to read", "Dropped"]}
        renderItem={renderItem}
        keyExtractor={(item) => item}
        numColumns={3}
        style={{ height: 300 }}
        contentContainerStyle={{ alignItems: "center" }}
      />
    </View>
  );
}
