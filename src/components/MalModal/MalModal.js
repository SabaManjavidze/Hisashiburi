import {
  StyleSheet,
  Text,
  View,
  Modal,
  Dimensions,
  FlatList,
  ImageBackground,
  DatePickerAndroid,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { mal_dict, primary_color } from "../variables";
// import { TextInput, TouchableRipple } from "react-native-paper";
import { useGetManga } from "../../Hooks/useGetManga";
import StatusView from "./components/StatusView";
import Header from "./components/Header";
// import ProgressView from "./components/ProgressView";
import ScoreView from "./components/ScoreView";
import DateView from "./components/DateView";
import SubmitBtn from "./components/SubmitBtn";
import { styles } from "./components/ModalStyles";

const { width, height } = Dimensions.get("window");

export default function MalModal({
  setModalVisible,
  modalVisible,
  mal,
  lastChapIdx,
}) {
  const [status, setStatus] = useState(
    mal && mal.my_list_status
      ? mal_dict[mal.my_list_status.status].text
      : "Plan to read"
  );
  const { chapters } = useGetManga();
  let prog = chapters[0].chap_num;
  let user_score = "-";
  let start_date = "";
  let finish_date = "";
  if (mal && mal.my_list_status) {
    if (lastChapIdx !== null) {
      prog = chapters[lastChapIdx].chap_num;
    } else {
      const last_read = chapters.find(
        (item) =>
          item.chap_title.replace("Chapter", "") ==
          mal.my_list_status.num_chapters_read
      );
      if (last_read) prog = last_read;
      // console.log({
      //   last_read,
      //   last_read_chap: mal.my_list_status.num_chapters_read,
      //   chap_length: chapters.length,
      // });
    }
    user_score = "" + mal.my_list_status.score;
    start_date = new Date(mal.my_list_status.start_date).toLocaleDateString();
    finish_date = new Date(mal.my_list_status.finish_date).toLocaleDateString();
  }

  const [progress, setProgress] = useState(
    mal?.my_list_status?.num_chapters_read.toString() || 0
  );
  useEffect(() => {
    console.log(progress);
  }, [progress]);

  const [score, setScore] = useState(user_score);
  const [startDate, setStartDate] = useState(start_date);
  const [finishDate, setFinishDate] = useState(finish_date);
  const [showDatePicker, setShowDatePicker] = useState(false);
  // const { token } = useAuth();

  return (
    <Modal
      visible={modalVisible}
      transparent
      animationType="fade"
      //   statusBarTranslucent
      style={{ width: width, height: height }}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modal}>
        <View
          style={{
            // marginTop: 105,
            width: "90%",
            height: "100%",
          }}
        >
          <Header mal={mal} setModalVisible={setModalVisible} />
          <StatusView status={status} setStatus={setStatus} />

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              justifyContent: "center",
              // marginVertical: 5,
            }}
          >
            {/* <TextInput label={"Chapters"} style={{ backgroundColor: "gray" }} /> */}
            <TextInput
              placeholder="Chapters"
              placeholderTextColor={"#ffffff94"}
              textAlign={"right"}
              style={{ color: "white", fontSize: 20 }}
              keyboardType="number-pad"
              value={progress}
              onChangeText={(text) => {
                setProgress(text);
              }}
              // onChange=
            />
            <Text style={{ color: "white", fontSize: 20 }}>
              /{mal.num_chapters || "?"}
            </Text>
          </View>
          {/* <ProgressView
            lastChapIdx={lastChapIdx}
            setProgress={setProgress}
            progress={progress}
            numChapters={mal.num_chapters}
          /> */}
          <ScoreView score={score} setScore={setScore} />
          <DateView
            setShowDatePicker={setShowDatePicker}
            showDatePicker={showDatePicker}
            setStartDate={setStartDate}
            startDate={startDate}
            finishDate={finishDate}
            setFinishDate={setFinishDate}
            status={status}
          />
        </View>
        <View
          style={{
            borderTopWidth: 1,
            borderColor: primary_color,
            // justifyContent: "center",
            alignItems: "flex-end",
            width: "100%",
            height: 60,
            bottom: 0,
            position: "absolute",
            // marginBottom: 150,
            // backgroundColor: "red",
          }}
        >
          <SubmitBtn
            mal={mal}
            progress={progress}
            score={score}
            status={status}
            startDate={startDate}
            finishDate={finishDate}
            setModalVisible={setModalVisible}
          />
        </View>
      </View>
    </Modal>
  );
}
