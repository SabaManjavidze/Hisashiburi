import { View, Text } from "react-native";
import React from "react";
import { styles } from "./ModalStyles";
import DatePickView from "../../../Pages/MangaDetails/Components/DatePickView";

export default function DateView({
  showDatePicker,
  setShowDatePicker,
  startDate,
  setStartDate,
  status,
  finishDate,
  setFinishDate,
}) {
  return (
    <View style={[styles.DateView]}>
      <View style={styles.ViewLabel}>
        <Text style={styles.ViewLabelText}>Date</Text>
        <Text style={styles.ViewLabelText}>
          {startDate !== null ? startDate : new Date().toLocaleDateString()}
        </Text>
      </View>
      <DatePickView
        date={startDate}
        setDate={setStartDate}
        enabled
        mode="Start Date"
        showDatePicker={showDatePicker}
        setShowDatePicker={setShowDatePicker}
      />

      <DatePickView
        date={finishDate}
        setDate={setFinishDate}
        mode="Finish Date"
        enabled={status === "Completed"}
        showDatePicker={showDatePicker}
        setShowDatePicker={setShowDatePicker}
      />
    </View>
  );
}
