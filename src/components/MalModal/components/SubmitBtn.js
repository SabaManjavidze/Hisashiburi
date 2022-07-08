import { View, Text } from "react-native";
import React from "react";
import {
  MAL_API_URL,
  mal_dict,
  primary_color,
  transp_main_color,
} from "../../variables";
import { useAuth } from "../../../Hooks/useAuth";
import axios from "axios";
import qs from "querystring";
import { TouchableRipple } from "react-native-paper";

export default function SubmitBtn({
  mal,
  status,
  score,
  progress,
  setModalVisible,
  startDate,
  finishDate,
}) {
  const { token } = useAuth();
  return (
    <TouchableRipple
      style={{
        width: "100%",
        height: "100%",
        // backgroundColor: "yellow",
        alignItems: "center",
        justifyContent: "center",
      }}
      rippleColor={transp_main_color}
      onPress={async () => {
        try {
          const headers = {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${token}`,
          };
          await axios({
            method: "PUT",
            url: `${MAL_API_URL}/manga/${mal.id}/my_list_status`,
            data: qs.stringify({
              // manga_id: manga_id,
              status: Object.keys(mal_dict).find(
                (key) => mal_dict[key].text === status
              ),
              score: parseInt(score),
              num_chapters_read: parseInt(progress),
              // start_date: new Date(startDate).toLocaleDateString(),
              // finish_date: finishDate || undefined,
            }),
            headers,
          });
          alert("Successfully updated");
          setModalVisible(false);
          // console.log(JSON.stringify(res, null, 2));
        } catch (error) {
          console.log(error);
          throw new Error(error);
        }
      }}
    >
      <Text
        style={{
          // color: "white",
          color: primary_color,
          textAlign: "center",
          fontSize: 17,
        }}
      >
        Submit
      </Text>
    </TouchableRipple>
  );
}
