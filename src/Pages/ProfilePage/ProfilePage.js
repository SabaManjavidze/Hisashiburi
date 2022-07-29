import {
  View,
  Text,
  Image,
  ScrollView,
  FlatList,
  Dimensions,
  StyleSheet,
  StatusBar,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { getMangaList, logOut } from "../../Services/MalServices";
import {
  main_color,
  main_url,
  mal_dict,
  primary_color,
  secondary_color,
} from "../../components/variables";
import { ActivityIndicator, TouchableRipple } from "react-native-paper";
import { useAuth } from "../../Hooks/useAuth";
import Swiper from "react-native-swiper";
import MyMangaList from "./components/MyMangaList";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
const { height, width } = Dimensions.get("window");

export default function ProfilePage({ route, navigation }) {
  const [mangaList, setMangaList] = useState([]);
  const [manga_loaded, setMangaLoaded] = useState(false);
  const { token } = useAuth();
  const Tab = createMaterialTopTabNavigator();
  const getUserMangaList = async () => {
    if (token && token !== "null") {
      const mangaList = await getMangaList(token);
      setMangaList(mangaList.data);
      setMangaLoaded(true);
    } else {
      alert("You are not logged in");
    }
  };

  useEffect(() => {
    getUserMangaList();
  }, []);
  const header_arr = ["reading", "completed", "plan_to_read", "dropped", "all"];
  const screenOptions = {
    tabBarLabelStyle: {
      color: "white",
      fontWeight: "100",
      width: "100%",
      overflow: "visible",
    },
    tabBarScrollEnabled: true,
    tabBarStyle: {
      backgroundColor: secondary_color,
      elevation: 0,
      paddingVertical: 5,
    },
    tabBarIndicatorStyle: { backgroundColor: primary_color },
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        width: "100%",
        height: "100%",
        alignContent: "center",
        backgroundColor: main_color,
        marginTop: 30,
      }}
    >
      <Tab.Navigator screenOptions={screenOptions}>
        {header_arr.map((item) => (
          <Tab.Screen
            key={item}
            name={mal_dict[item].text}
            children={() =>
              manga_loaded ? (
                <MyMangaList
                  setMangaList={setMangaList}
                  setMangaLoaded={setMangaLoaded}
                  getUserMangaList={getUserMangaList}
                  mangaList={
                    item == "all"
                      ? mangaList
                      : mangaList.filter(
                          ({ node }) => node.my_list_status.status === item
                        )
                  }
                  showHeader={item == "all"}
                  navigation={navigation}
                  route={route}
                />
              ) : (
                <View
                  style={{
                    flex: 1,
                    height: "100%",
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: main_color,
                  }}
                >
                  <ActivityIndicator animating={true} color={primary_color} />
                </View>
              )
            }
          />
        ))}
      </Tab.Navigator>
    </SafeAreaView>
  );
}
