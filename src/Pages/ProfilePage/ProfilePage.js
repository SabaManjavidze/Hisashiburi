import {
  View,
  Text,
  Image,
  ScrollView,
  FlatList,
  Dimensions,
  StyleSheet,
  StatusBar,
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
  // const [profile, setProfile] = useState({});
  const [mangaList, setMangaList] = useState([]);
  const [manga_loaded, setMangaLoaded] = useState(false);
  // const [indecies, setIndecies] = useState([]);
  // const [profile_loaded, setProfileLoaded] = useState(true);
  const { token } = useAuth();
  const Tab = createMaterialTopTabNavigator();
  const getUserMangaList = async () => {
    if (token && token !== "null") {
      // const profile = await getProfile(token);
      // setProfile(profile);
      // setProfileLoaded(true);
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
  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        alignContent: "center",
        backgroundColor: main_color,
        marginTop: 30,
      }}
    >
      <StatusBar
        animated={false}
        backgroundColor={secondary_color}
        hidden={false}
        style={"light"}
      />
      <Tab.Navigator
        screenOptions={{
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
        }}
      >
        {header_arr.map((item) => (
          <Tab.Screen
            // name={item[0].toUpperCase() + item.slice(1)}
            key={item}
            name={mal_dict[item].text}
            children={() => (
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
            )}
          />
        ))}
      </Tab.Navigator>
      {manga_loaded ? null : (
        <View
          style={{
            flex: 1,
            top: height / 2,
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <ActivityIndicator animating={true} color={primary_color} />
        </View>
      )}
    </View>
  );
}

// <View
//   style={{
//     flex: 1,
//     flexDirection: "row",
//     flexWrap: "wrap",
//     alignItems: "flex-start",
//   }}
// >
//   {mangaList.map((item, index) => {
//     return renderItem({ item, index });
//   })}
// </View>
const styles = StyleSheet.create({});
