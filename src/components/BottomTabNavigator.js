import { View, Text, StyleSheet, AsyncStorage } from "react-native";
import React, { useEffect, useState } from "react";
import { Button, Avatar, TouchableRipple } from "react-native-paper";
import { main_color, paper_primary_color, primary_color } from "./variables";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function BottomTabNavigator() {
  const navigation = useNavigation();
  // const [route, setRoute] = useState("");
  const route = "";

  return (
    <View style={styles.container}>
      {/* {console.log(JSON.stringify(nav_state))} */}
      {route !== "ChapterPage" && (
        <>
          <View style={styles.child_cont}>
            <Button
              icon={"home"}
              onPress={() => {
                navigation.navigate("Home");
              }}
            ></Button>
            <Text style={{ color: "white" }}>Home</Text>
          </View>
          <View style={styles.child_cont}>
            <Button
              icon={"star"}
              onPress={() => {
                navigation.navigate("Favorites");
              }}
            ></Button>
            <Text style={{ color: "white" }}>Favorites</Text>
          </View>
          {/* Log In Page */}
          {isAuth || (
            <TouchableRipple
              onPress={() => navigation.navigate("Auth")}
              style={styles.child_cont}
            >
              <View>
                <Avatar.Icon
                  icon={
                    route === "Auth"
                      ? "account-circle"
                      : "account-circle-outline"
                  }
                  size={40}
                  style={{
                    backgroundColor:
                      route === "Auth" ? paper_primary_color : null,
                  }}
                />
                <Text style={{ color: "white" }}>LogIn</Text>
              </View>
            </TouchableRipple>
          )}
          {/* Profile Page */}
          <TouchableRipple
            onPress={() => navigation.navigate("Profile")}
            style={styles.child_cont}
          >
            <View>
              <Avatar.Icon
                icon={route === "Profile" ? "account" : "account-outline"}
                size={40}
                style={{
                  backgroundColor:
                    route === "Profile" ? paper_primary_color : null,
                }}
              />
              <Text style={{ color: "white" }}>Profile</Text>
            </View>
          </TouchableRipple>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: main_color,
    borderTopColor: "white",
    borderTopWidth: 0.9,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  child_cont: {
    flexDirection: "column",
  },
});
