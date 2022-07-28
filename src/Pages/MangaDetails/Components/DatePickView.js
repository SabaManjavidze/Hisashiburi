import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { primary_color } from "../../../components/variables";
import { TouchableRipple } from "react-native-paper";

export default function DatePickView({
  showDatePicker,
  setShowDatePicker,
  date,
  setDate,
  mode,
  enabled = true,
}) {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {enabled && showDatePicker ? (
        <DateTimePicker
          onChange={(e, selectedDate) => {
            setDate(selectedDate.toLocaleDateString());
            setShowDatePicker(false);
          }}
          value={date !== null ? new Date(date) : new Date()}
          mode={"date"}
        />
      ) : null}
      <TouchableRipple
        onPress={() => {
          enabled && setShowDatePicker(true);
        }}
        style={{ width: "70%" }}
      >
        <View
          style={{
            borderBottomWidth: 0.5,
            borderColor: "gray",
          }}
        >
          <Text
            style={{
              color: enabled ? "white" : "gray",
              fontSize: 15,
              fontWeight: "200",
              paddingBottom: 10,
              textAlign: "left",
              marginLeft: 55,
            }}
          >
            {enabled ? (date === null ? mode : date) : mode}
          </Text>
        </View>
      </TouchableRipple>
      <Text
        onPress={() => {
          if (enabled) {
            const currDate = new Date().toLocaleDateString();
            setDate(currDate === date ? null : new Date().toLocaleDateString());
          }
        }}
        style={{
          width: "30%",
          color: primary_color,
          textAlign: "center",
          padding: 25,
          fontSize: 15,
        }}
      >
        Today
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({});
