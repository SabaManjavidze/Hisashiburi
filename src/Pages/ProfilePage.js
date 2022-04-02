import {
  View,
  Text,
  AsyncStorage,
  Image,
  ScrollView,
  Dimensions,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import { getMangaList, getProfile } from "../Services/MalServices";
import { main_color, main_url, primary_color } from "../components/variables";
import { ActivityIndicator, TouchableRipple } from "react-native-paper";
import MalCard from "../components/MalCard";

const windowHeight = Dimensions.get("window").height;

export default function ProfilePage({ route, navigation }) {
  const [profile, setProfile] = useState({});
  const [mangaList, setMangaList] = useState({});
  const [manga_loaded, setMangaLoaded] = useState(false);
  const [profile_loaded, setProfileLoaded] = useState(false);
  const getAccessToken = async () => {
    const access_token = await AsyncStorage.getItem("access_token");

    if (access_token && access_token !== "null") {
      const profile = await getProfile(access_token);
      setProfile(profile);
      setProfileLoaded(true);
      const mangaList = await getMangaList(access_token);
      setMangaList(mangaList.data);
      setMangaLoaded(true);
    } else {
      alert("You are not logged in");
    }
  };

  useEffect(() => {
    getAccessToken();
  }, []);

  const renderItem = ({ item, index }) => {
    const { node } = item;
    // console.log(JSON.stringify(node,null,2))
    return (
      <MalCard
        node={node}
        key={node.id}
        navigation={navigation}
        route={route}
      />
    );
  };
  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        alignContent: "center",
        backgroundColor: main_color,
      }}
    >
      <ScrollView
        nestedScrollEnabled
        contentContainerStyle={{
          flexDirection: "column",
          width: "100%",
          alignItems: "center",
        }}
      >
        {profile_loaded ? (
          <>
            <Text style={{ fontSize: 30, fontWeight: "bold", color: "white" }}>
              {profile.name}
            </Text>
            <Image
              source={{ uri: profile.picture }}
              style={{ width: 200, height: 200 }}
            />
          </>
        ) : (
          <View
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: main_color,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ActivityIndicator
              animating={true}
              size="large"
              color={primary_color}
            />
          </View>
        )}
        {manga_loaded && (
          // <FlatList
          //   nestedScrollEnabled
          //   data={mangaList}
          //   renderItem={renderItem}
          //   keyExtractor={(item) => item.node.id}
          //   numColumns={2}
          //   style={{ height: "100%", width: "100%" }}
          //   // contentContainerStyle={{alignItems:'center',justifyContent:"center"}}
          // />
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              flexWrap: "wrap",
              alignItems: "flex-start",
            }}
          >
            {mangaList.map((item, index) => {
              return renderItem({ item, index });
            })}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({});
