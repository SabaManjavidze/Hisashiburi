import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  StyleSheet,
  FlatList,
  StatusBar,
} from "react-native";
import { ActivityIndicator, TouchableRipple } from "react-native-paper";
import ChapterItem from "./Components/ChapterItem";
import { getMangaOnMAL } from "../../Services/MalServices";
import {
  main_url,
  domain,
  main_color,
  primary_color,
  secondary_color,
  mal_dict,
} from "../../components/variables";
import { useAuth } from "../../Hooks/useAuth";
import DetailsAppbar from "./Components/DetailsAppbar";
import ChapterSearchModal from "./Components/ChapterSearchModal";
import FAB from "./Components/FAB";

export const fetchData = async (manga_id) => {
  const url = `${main_url}/manga/${manga_id}`;
  const data = await fetch(url);
  const json = await data.json();
  return json;
};
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
export default function MangaDetails({ navigation, route }) {
  const { item } = route.params;
  const { manga_id, title } = item;
  const { token } = useAuth();

  const [mal, setMAL] = useState();
  const [mal_loaded, setMALLoaded] = useState();

  const [chapters, setChapters] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const [poster, setPoster] = useState("");
  const [poster_loaded, setPosterLoaded] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);

  const [fab_open, setFabOpen] = useState(false);

  const scrollRef = useRef(null);

  const fetchChapters = async () => {
    // navigation.setOptions({ title: title });
    const json = await fetchData(manga_id);
    // console.log(json.details.img_url);
    setPoster(json.details.img_url);
    setPosterLoaded(true);
    setChapters(json.chapters);
    setLoaded(true);
  };

  const fetchMAL = async () => {
    const data = await getMangaOnMAL(title, token);
    // console.log(data ? JSON.stringify(data, null, 2) : "nope");
    setMAL(data);
    setMALLoaded(true);
  };

  const onPress = async () => {
    if (token) {
      // add to MAL
    } else {
      navigation.navigate("LogIn");
    }
  };

  useEffect(() => {
    fetchChapters();
    token && fetchMAL();
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
      <StatusBar
        backgroundColor={fab_open ? "#151623" : main_color}
        translucent
      />
      <ChapterSearchModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        chapters={chapters}
        manga_id={manga_id}
        navigation={navigation}
      />
      <DetailsAppbar title={title} navigation={navigation} />
      <FAB
        navigation={navigation}
        chapters={chapters}
        manga_id={manga_id}
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
      />
      <View
        style={{
          alignItems: "baseline",
          width: "100%",
          height: "100%",
          backgroundColor: main_color,
        }}
      >
        {loaded ? (
          <FlatList
            data={chapters}
            style={{ width: "100%" }}
            contentContainerStyle={{
              width: "100%",
              paddingBottom: 105,
              alignItems: "center",
            }}
            ListHeaderComponent={
              <View
                style={{
                  width: "100%",
                  alignItems: "center",
                  marginBottom: 20,
                }}
              >
                <View
                  style={{
                    width: 200,
                    height: 300,
                  }}
                >
                  {poster_loaded && (
                    <Image
                      source={{
                        uri: `${domain}${poster}`,
                      }}
                      style={{
                        width: "100%",
                        height: 300,
                        resizeMode: "cover",
                      }}
                    />
                  )}
                </View>
                <TouchableRipple
                  style={{
                    borderColor: primary_color,
                    borderWidth: 1,
                    backgroundColor: secondary_color,
                    width: windowWidth * 0.97,
                    borderRadius: 15,
                    height: 50,
                    justifyContent: "center",
                    marginTop: 20,
                  }}
                  onPress={() => onPress()}
                >
                  <Text
                    style={{
                      color: "white",
                      textAlign: "center",
                      fontSize: 20,
                    }}
                  >
                    {token
                      ? mal_loaded && getStatus()
                      : "Sign In To Add To Your List"}
                  </Text>
                </TouchableRipple>
              </View>
            }
            ref={scrollRef}
            keyExtractor={(item) => item.chap_title}
            renderItem={({ item, index }) => (
              <ChapterItem
                chapters={chapters}
                child={item}
                navigation={navigation}
                manga_id={manga_id}
                index={index}
                key={index}
              />
            )}
          />
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
