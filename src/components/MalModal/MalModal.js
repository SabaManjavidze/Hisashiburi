import {
  StyleSheet,
  Text,
  View,
  Modal,
  Dimensions,
  FlatList,
  ImageBackground,
  DatePickerAndroid,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  light_primary_color,
  MAL_API_URL,
  mal_dict,
  paper_primary_color,
  primary_color,
  secondary_color,
  transp_main_color,
} from "../variables";
import { TouchableRipple } from "react-native-paper";
import { useGetManga } from "../../Hooks/useGetManga";
import StatusView from "./components/StatusView";
import Header from "./components/Header";
import ProgressView from "./components/ProgressView";
import ScoreView from "./components/ScoreView";
import DateView from "./components/DateView";
import SubmitBtn from "./components/SubmitBtn";
import { styles } from "./components/ModalStyles";

const { width, height } = Dimensions.get("window");

export default function MalModal({
  setModalVisible,
  modalVisible,
  mal,
  userData,
  lastChapIdx,
}) {
  const [status, setStatus] = useState(
    mal && mal.my_list_status
      ? mal_dict[mal.my_list_status.status].text
      : "Plan to read"
  );
  const { chapters } = useGetManga();
  let prog = chapters[chapters.length - 1].chap_num;
  let user_score = "-";
  let start_date = "";
  let finish_date = "";
  if (mal && mal.my_list_status) {
    if (lastChapIdx !== null) {
      prog = chapters[lastChapIdx].chap_num;
    }
    user_score = "" + mal.my_list_status.score;
    start_date = new Date(mal.my_list_status.start_date).toLocaleDateString();
    finish_date = new Date(mal.my_list_status.finish_date).toLocaleDateString();
  }

  const [progress, setProgress] = useState(prog);
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
          <ProgressView
            lastChapIdx={lastChapIdx}
            setProgress={setProgress}
            progress={progress}
          />
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
            setModalVisible={setModalVisible}
          />
        </View>
      </View>
    </Modal>
  );
}
