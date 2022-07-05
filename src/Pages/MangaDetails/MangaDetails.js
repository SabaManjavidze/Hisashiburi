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
  domain,
  main_color,
  primary_color,
  secondary_color,
  mal_dict,
  clg,
  boneColor,
  transp_main_color,
} from "../../components/variables";
import { useAuth } from "../../Hooks/useAuth";
import DetailsAppbar from "./Components/DetailsAppbar";
import ChapterSearchModal from "./Components/ChapterSearchModal";
import FAB from "./Components/FAB";
import ListHeaderComponent from "./Components/ListHeaderComponent";
import { fetchData } from "../../utils/fetchData";
import { MangaContext } from "../../Hooks/useGetManga";

import { GET_READ_MANGA } from "../../graphql/Queries";
import { useQuery } from "@apollo/client";
import MalModal from "../../components/MalModal/MalModal";
const { width, height } = Dimensions.get("window");

export default function MangaDetails({ navigation, route }) {
  const { item } = route.params;
  const { manga_id, title } = item;
  const { token, user } = useAuth();

  const [mal, setMAL] = useState(null);
  const [mal_loaded, setMALLoaded] = useState(false);

  const [chapters, setChapters] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const [details, setDetails] = useState({});

  const [modalVisible, setModalVisible] = useState(false);
  const [malModalVisible, setMalModalVisible] = useState(false);

  const [lastChapIdx, setLastChapIdx] = useState(null);
  const [lastChapLoaded, setLastChapLoaded] = useState(false);

  const scrollRef = useRef(null);

  const {
    data: rm_data,
    loading: rm_loading,
    error,
    refetch,
  } = useQuery(GET_READ_MANGA, {
    variables: { user_id: user.user_id, manga_id: manga_id },
  });

  const fetchMangaDetails = async () => {
    const json = await fetchData(manga_id);
    const { details, chapters } = json;
    console.log(`from details page :${details.alternative_titles}`);
    setDetails(details);
    setChapters(chapters);
    setLoaded(true);
  };

  const fetchMAL = async () => {
    // console.log("called mal");
    const data = await getMangaOnMAL(details, token);
    console.log("FROM DETAILS PAGE", data);
    setMAL(data);
    setMALLoaded(true);
  };
  useEffect(() => {
    fetchMangaDetails();
    if (token && loaded) fetchMAL();
  }, [loaded]);
  useEffect(() => {
    if (!rm_loading && rm_data.getReadManga.length > 0 && loaded) {
      chapters.findIndex((chapter, i) => {
        if (chapter.chap_num == rm_data.getReadManga[0].last_read_chapter) {
          // const index = chapters.length - 1 - i;
          // clg({ index: i });
          setLastChapIdx(i);
          setLastChapLoaded(true);

          // return i;
        }
      });
    }
  }, [rm_loading, loaded]);

  return (
    <MangaContext.Provider
      value={{ navigation, route, chapters, manga_id, title }}
    >
      <View style={styles.container}>
        <StatusBar
          backgroundColor={malModalVisible ? "rgba(0,0,0,0.7)" : main_color}
          translucent
        />
        <ChapterSearchModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />

        {loaded && mal_loaded ? (
          <MalModal
            modalVisible={malModalVisible}
            setModalVisible={setMalModalVisible}
            mal={mal}
            userData={
              rm_data.getReadManga.length > 0 ? rm_data.getReadManga[0] : null
            }
            lastChapIdx={lastChapIdx}
          />
        ) : null}
        <DetailsAppbar />

        <FAB
          setModalVisible={setModalVisible}
          modalVisible={modalVisible}
          loading={rm_loading}
          data={rm_data}
        />

        <View
          style={{
            alignItems: "baseline",
            width: "100%",
            height: "100%",
            backgroundColor: main_color,
          }}
        >
          <FlatList
            data={chapters}
            style={{ width: "100%" }}
            contentContainerStyle={{
              width: "100%",
              paddingBottom: 105,
              alignItems: "center",
            }}
            ListHeaderComponent={
              <View>
                <ListHeaderComponent
                  poster={details.img_url}
                  mal={mal}
                  mal_loaded={mal_loaded}
                  loaded={loaded}
                  setModalVisible={setMalModalVisible}
                  modalVisible={malModalVisible}
                />

                {loaded && !rm_loading ? (
                  rm_data.getReadManga.length > 0 ? (
                    lastChapLoaded ? (
                      <View
                        style={{
                          width: "100%",
                          alignItems: "center",
                          marginTop: 5,
                          marginBottom: 30,
                        }}
                      >
                        <Text style={styles.lastReadLabel}>Last Read</Text>
                        {/* <Text style={{ color: "white", fontSize: 20 }}>
                          {chapters[lastChapIdx].chap_num}
                        </Text> */}
                        <ChapterItem
                          borderColor={boneColor}
                          index={lastChapIdx}
                        />
                      </View>
                    ) : null
                  ) : null
                ) : null}
              </View>
            }
            ref={scrollRef}
            keyExtractor={(item) => item.chap_num}
            renderItem={({ item, index }) => (
              // console.log(item),
              <ChapterItem child={item} index={index} />
            )}
          />
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
  lastReadLabel: {
    color: "white",
    opacity: 0.75,
    marginLeft: 65,
    marginBottom: 25,
    fontWeight: "bold",
    fontSize: 20,
    width: "100%",
    textAlign: "left",
  },
});
