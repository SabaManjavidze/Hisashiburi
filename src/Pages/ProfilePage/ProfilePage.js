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
import { getMangaList, getProfile, logOut } from "../../Services/MalServices";
import {
  main_color,
  main_url,
  primary_color,
} from "../../components/variables";
import { ActivityIndicator, TouchableRipple } from "react-native-paper";
import MalCard from "../../components/MalCard";
import { useAuth } from "../../Hooks/useAuth";

const windowHeight = Dimensions.get("window").height;

export default function ProfilePage({ route, navigation }) {
  const [profile, setProfile] = useState({});
  const [mangaList, setMangaList] = useState({});
  const [manga_loaded, setMangaLoaded] = useState(false);
  const [profile_loaded, setProfileLoaded] = useState(false);
  const { token, setToken } = useAuth();

  const getAccessToken = async () => {
    if (token && token !== "null") {
      const profile = await getProfile(token);
      setProfile(profile);
      setProfileLoaded(true);
      const mangaList = await getMangaList(token);
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
        <>
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              justifyContent: "center",
            }}
          >
            {profile_loaded ? (
              <Text
                style={{
                  fontSize: 30,
                  fontWeight: "bold",
                  color: "white",
                  textAlign: "center",
                  left: 30,
                }}
              >
                {profile.name}
              </Text>
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
            <TouchableRipple
              style={{ backgroundColor: primary_color, left: 100 }}
              onPress={async () => {
                await logOut();
                setToken(null);
              }}
            >
              <Text style={{ color: "white", fontSize: 20 }}>Log out</Text>
            </TouchableRipple>
          </View>
          <Image
            source={{ uri: profile.picture }}
            style={{ width: 200, height: 200 }}
          />
        </>
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
