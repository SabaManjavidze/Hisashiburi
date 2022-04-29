import {
  View,
  Text,
  Image,
  ScrollView,
  FlatList,
  Dimensions,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import { getMangaList, logOut } from "../../Services/MalServices";
import {
  main_color,
  main_url,
  primary_color,
} from "../../components/variables";
import { ActivityIndicator, TouchableRipple } from "react-native-paper";
import MalCard from "../../components/MalCard";
import ProfileHeader from "./components/ProfileHeader";
import { useAuth } from "../../Hooks/useAuth";
const { height, width } = Dimensions.get("window");

export default function ProfilePage({ route, navigation }) {
  // const [profile, setProfile] = useState({});
  const [mangaList, setMangaList] = useState([]);
  const [manga_loaded, setMangaLoaded] = useState(false);
  // const [profile_loaded, setProfileLoaded] = useState(true);
  const { token } = useAuth();

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
      <FlatList
        nestedScrollEnabled
        data={mangaList}
        renderItem={renderItem}
        keyExtractor={(item) => item.node.id}
        numColumns={2}
        onRefresh={() => {
          setMangaLoaded(false);
          setMangaList([]);
          getUserMangaList();
        }}
        refreshing={false}
        ListHeaderComponent={<ProfileHeader />}
        style={{ height: "100%", width: "100%" }}
      />
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
