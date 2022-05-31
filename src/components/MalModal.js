import {
  StyleSheet,
  Text,
  View,
  Modal,
  Dimensions,
  FlatList,
  ImageBackground,
} from "react-native";
import React, { useEffect, useState } from "react";
import { mal_dict } from "./variables";
import { TouchableRipple } from "react-native-paper";

const { width, height } = Dimensions.get("window");

export default function MalModal({ setModalVisible, modalVisible, mal }) {
  const [status, setStatus] = useState("");
  const renderItem = ({ item }) => (
    <TouchableRipple
      onPress={() => setStatus(mal_dict[item].text)}
      style={styles.StatusItem}
      key={item.text}
    >
      <Text
        style={{
          fontSize: 15,
          color: "white",
          textAlign: "center",
        }}
      >
        {mal_dict[item].text}
      </Text>
    </TouchableRipple>
  );

  return (
    <Modal
      visible={modalVisible}
      transparent
      animationType="fade"
      //   statusBarTranslucent
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modal}>
        <View
          style={{
            marginTop: 45,
            width: "90%",
            height: "100%",
          }}
        >
          <View style={[styles.StatusView]}>
            <View style={styles.ViewLabel}>
              <Text style={styles.ViewLabelText}>Status</Text>
              <Text style={styles.ViewLabelText}>{status}</Text>
            </View>
            <FlatList
              data={Object.keys(mal_dict)}
              //   horizontal
              renderItem={renderItem}
              keyExtractor={(item) => item.text}
              numColumns={3}
              style={{ height: 300 }}
              contentContainerStyle={{ marginTop: 20, alignItems: "center" }}
            />
          </View>
          <View style={styles.ProgressView}>
            <View style={styles.ViewLabel}>
              <Text style={styles.ViewLabelText}>Progress</Text>
              <Text style={styles.ViewLabelText}>Value</Text>
            </View>
          </View>
          <View style={styles.ScoreView}>
            <View style={styles.ViewLabel}>
              <Text style={styles.ViewLabelText}>Score</Text>
              <Text style={styles.ViewLabelText}>Value</Text>
            </View>
          </View>
          <View style={styles.DateView}>
            <View style={styles.ViewLabel}>
              <Text style={styles.ViewLabelText}>Date</Text>
              <Text style={styles.ViewLabelText}>Value</Text>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    // marginHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,.7)",
  },
  StatusView: { flex: 1, justifyContent: "center", alignItems: "center" },
  StatusItem: {
    width: 110,
    height: 50,
    margin: 5,
    // padding: 15,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "gray",
  },
  ScoreView: { flex: 1 },
  DateView: { flex: 1 },
  ProgressView: { flex: 1 },

  ViewLabelText: { color: "white", fontSize: 15 },
  ViewLabel: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    // marginHorizontal: 10,
  },
});
