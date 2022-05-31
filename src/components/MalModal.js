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
import { clg, mal_dict } from "./variables";
import { TouchableRipple } from "react-native-paper";
import { useGetManga } from "../Hooks/useGetManga";
import HorizontalPicker from "@vseslav/react-native-horizontal-picker";
import { LinearGradient } from "expo-linear-gradient";
const { width, height } = Dimensions.get("window");

export default function MalModal({
  setModalVisible,
  modalVisible,
  mal,
  userData,
  lastChapIdx,
}) {
  const [status, setStatus] = useState(
    mal.my_list_status
      ? mal_dict[mal.my_list_status.status].text
      : "Plan To Read"
  );
  const { chapters, manga_id } = useGetManga();
  let prog = chapters[chapters.length - 1].chap_num;
  let user_score = "10";
  if (mal.my_list_status) {
    prog = chapters[lastChapIdx].chap_num;
    if (mal.my_list_status.score > 0) {
      user_score = score;
    }
  }

  const [progress, setProgress] = useState(prog);
  const [score, setScore] = useState(user_score);

  const LN_SIDE_COLOR = "rgba(0,0,0,0.8)";
  const LN_CENTER_COLOR = "#0B5FA500";

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
  //   useEffect(() => {
  //     //   console.log(manga_id);
  //     if (lastChapIdx) {
  //       setProgress(chapters[lastChapIdx].chap_num);
  //     }
  //   }, [lastChapIdx]);

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
              //   data={Object.keys(mal_dict)}
              data={["Reading", "Completed", "Plan To Read", "Dropped"]}
              //   horizontal
              renderItem={renderItem}
              keyExtractor={(item) => item}
              numColumns={3}
              style={{ height: 300 }}
              contentContainerStyle={{ alignItems: "center" }}
            />
          </View>
          <View style={[styles.ProgressView]}>
            <View style={styles.ViewLabel}>
              <Text style={styles.ViewLabelText}>Progress</Text>
              <Text style={styles.ViewLabelText}>
                {progress}/
                {chapters !== null &&
                  chapters.length > 0 &&
                  chapters[0].chap_num}
              </Text>
            </View>
            <View>
              <HorizontalPicker
                data={chapters}
                defaultIndex={
                  lastChapIdx === undefined ? chapters.length - 1 : lastChapIdx
                }
                animatedScrollToDefaultIndex
                onChange={(index) => {
                  setProgress(chapters[index].chap_num);
                }}
                renderItem={pickerRenderItem}
                itemWidth={50}
                // snapTimeout={100}
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
          <View style={[styles.ScoreView]}>
            <View style={styles.ViewLabel}>
              <Text style={styles.ViewLabelText}>Score</Text>
              <Text style={styles.ViewLabelText}>{score}</Text>
            </View>
            <View>
              <HorizontalPicker
                data={[...Array(11).keys()]}
                defaultIndex={score > 0 && score}
                animatedScrollToDefaultIndex
                onChange={(index) => {
                  setScore(index);
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
                snapTimeout={320}
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
          <View style={[styles.DateView]}>
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
  DateView: { flex: 2 },
  ProgressView: { flex: 1 },

  ViewLabelText: { color: "white", fontSize: 15 },
  ViewLabel: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
    // marginHorizontal: 10,
  },
});
