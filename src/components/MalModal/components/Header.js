import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useAuth } from "../../../Hooks/useAuth";
import axios from "axios";
import {
  clg,
  light_primary_color,
  MAL_API_URL,
  primary_color,
} from "../../variables";
import { TouchableRipple } from "react-native-paper";

export default function Header({ mal, setModalVisible }) {
  const { token } = useAuth();
  return (
    <View
      style={{
        marginTop: 15,
        height: 65,
        marginBottom: 15,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <View
        style={{
          height: "100%",
          flex: 1.5,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TouchableRipple
          onPress={async () => {
            const headers = {
              "Content-Type": "application/x-www-form-urlencoded",
              Authorization: `Bearer ${token}`,
            };
            try {
              const res = await axios({
                method: "DELETE",
                url: `${MAL_API_URL}/manga/${mal.id}/my_list_status`,
                headers,
              });
            } catch (error) {
              throw new Error(JSON.stringify(error, null, 2));
              return;
            }
            alert("Manga removed from your list");
          }}
          style={{
            borderColor: "rgba(250, 80, 80, 0.45)",
            borderWidth: 1,
            width: 220,
            borderRadius: 15,
            height: "80%",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              color: "red",
              fontSize: 15,
              textAlign: "center",
            }}
          >
            Remove From List
          </Text>
        </TouchableRipple>
      </View>
      <View
        style={{
          flex: 1,
          height: "100%",
          justifyContent: "center",
          alignItems: "flex-end",
        }}
      >
        <TouchableRipple
          style={{
            borderColor: primary_color,
            borderWidth: 1,
            width: 60,
            height: "80%",
            borderRadius: 10,
            justifyContent: "center",
          }}
          onPress={() => {
            setModalVisible(false);
          }}
        >
          <Text
            style={{
              color: primary_color,
              fontSize: 15,
              textAlign: "center",
            }}
          >
            X
          </Text>
        </TouchableRipple>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
