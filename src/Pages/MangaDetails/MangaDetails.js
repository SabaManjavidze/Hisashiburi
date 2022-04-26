import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
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
import ListHeaderComponent from "./Components/ListHeaderComponent";

export const fetchData = async (manga_id) => {
  const url = `${main_url}/manga/${manga_id}`;
  const data = await fetch(url);
  const json = await data.json();
  return json;
};

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export const MangaContext = createContext(null);
export const useGetManga = () => useContext(MangaContext);

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
    const { details, chapters } = json;
    setPoster(details.img_url);
    setPosterLoaded(true);
    setChapters(chapters);
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
    token && fetchMAL();
  }, []);

  return (
    <MangaContext.Provider value={{ chapters, manga_id, title }}>
      <View style={styles.container}>
        <StatusBar
          backgroundColor={fab_open ? "#151623" : main_color}
          translucent
        />
        <ChapterSearchModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          // chapters={chapters}
          // manga_id={manga_id}
          // manga_title={title}
          navigation={navigation}
        />
        <DetailsAppbar title={title} navigation={navigation} />
        <FAB
          navigation={navigation}
          // chapters={chapters}
          // manga_id={manga_id}
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
          {/* {loaded ? ( */}
          <FlatList
            data={chapters}
            style={{ width: "100%" }}
            contentContainerStyle={{
              width: "100%",
              paddingBottom: 105,
              alignItems: "center",
            }}
            ListHeaderComponent={
              <ListHeaderComponent
                poster={poster}
                poster_loaded={poster_loaded}
                mal={mal}
                mal_loaded={mal_loaded}
                navigation={navigation}
                route={route}
                loaded={loaded}
              />
            }
            ref={scrollRef}
            keyExtractor={(item) => item.chap_title}
            renderItem={({ item, index }) => (
              <ChapterItem
                child={item}
                navigation={navigation}
                // chapters={chapters}
                // manga_id={manga_id}
                // manga_title={title}
                index={index}
                key={index}
              />
            )}
          />
          {/* ) : ( */}
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
          {/* )} */}
        </View>
      </View>
    </MangaContext.Provider>
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
