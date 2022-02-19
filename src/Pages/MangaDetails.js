import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  useWindowDimensions,
  StyleSheet,
  SafeAreaView,
  AsyncStorage,
  Button,
} from "react-native";
import { ActivityIndicator, TouchableRipple } from "react-native-paper";
import ChapterItem from "../components/ChapterItem";
import { getMangaOnMAL } from "../Services/MalServices";
import {
  main_url,
  domain,
  img_url,
  main_color,
  primary_color,
} from "../components/variables";
import { useAuth } from "../Hooks/useAuth";

export const fetchData = async (manga_id) => {
  const url = `${main_url}/manga/${manga_id}`;
  const data = await fetch(url);
  const json = await data.json();
  return json;
};

export default function MangaDetails({ navigation, route }) {
  const { item } = route.params;
  const { manga_id, title } = item;
  const { token } = useAuth();
  const [mal, setMAL] = useState();
  const [mal_loaded, setMALLoaded] = useState();
  const [chapters, setChapters] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [fav, setFav] = useState(false);
  const mal_dict = {
    reading: "Reading",
    plan_to_read: "Plan to Read",
    completed: "Completed",
    on_hold: "On Hold",
    dropped: "Dropped",
  };
  const fetchChapters = async () => {
    navigation.setOptions({ title: title });
    const json = await fetchData(manga_id);
    setChapters(json.chapters);
    setLoaded(true);
  };
  const fetchMAL = async () => {
    const data = await getMangaOnMAL(title, token);
    // console.log(data ? JSON.stringify(data, null, 2) : "nope");
    setMAL(data);
    setMALLoaded(true);
  };

  useEffect(() => {
    fetchChapters();
    fetchMAL();
  }, []);
  const getStatus = () => {
    if (mal !== null) {
      if (mal.my_list_status == null) {
        return "Add To My List";
      } else {
        return mal_dict[mal.my_list_status.status];
      }
    }
    return "This Manga Is Not On MyAnimeList";
  };
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ alignItems: "center" }}>
        <View style={{ width: "100%", alignItems: "center" }}>
          <Image
            source={{ uri: `${domain}${img_url}${manga_id}.jpg` }}
            style={{ width: 200, height: 300, resizeMode: "cover" }}
          />
          <TouchableRipple
            style={{
              backgroundColor: primary_color,
              width: "100%",
              height: 35,
              justifyContent: "center",
              marginTop: 20,
            }}
            onPress={() => onPress()}
          >
            <Text style={{ color: "white", textAlign: "center", fontSize: 20 }}>
              {mal_loaded && getStatus()}
            </Text>
          </TouchableRipple>
        </View>
        {/* <Button title="clear async storage" onPress={()=>{AsyncStorage.clear()}}/> */}
        <View
          style={{
            alignItems: "baseline",
            marginTop: 35,
            width: "100%",
            height: "100%",
            backgroundColor: main_color,
          }}
        >
          {loaded ? (
            chapters.map((child, i) => {
              return (
                <ChapterItem
                  chapters={chapters}
                  key={child.chapter_num}
                  child={child}
                  navigation={navigation}
                  manga_id={manga_id}
                  index={i}
                />
              );
            })
          ) : (
            <View
              style={{
                width: "100%",
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
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    // alignItems:'center',
    width: "100%",
    height: "100%",
    backgroundColor: main_color,
  },
});
