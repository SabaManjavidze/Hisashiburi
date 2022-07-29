import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { View, Text, StyleSheet, FlatList, StatusBar } from "react-native";
import { ActivityIndicator, TouchableRipple } from "react-native-paper";
import ChapterItem from "./Components/ChapterItem";
import { getMangaOnMAL } from "../../Services/MalServices";
import {
  main_color,
  primary_color,
  boneColor,
  secondary_color,
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

export default function MangaDetails({ navigation, route }) {
  const { item, malItem } = route.params;
  const { manga_id, title, href } = item;
  const { token, user } = useAuth();

  const [mal, setMAL] = useState(malItem);
  const [mal_loaded, setMALLoaded] = useState(!!malItem);

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
    variables: { user_id: user?.user_id ?? "", manga_id: manga_id },
  });

  const fetchMangaDetails = async () => {
    const json = await fetchData(manga_id);
    console.log({ json });
    const { details, chapters } = json;
    setDetails(details);
    setChapters(chapters);
    setLoaded(true);
  };

  const fetchMAL = async () => {
    const data = await getMangaOnMAL(details, token);
    setMAL(data);
    setMALLoaded(true);
  };
  useEffect(() => {
    fetchMangaDetails();
    if (token && loaded && !mal_loaded) {
      fetchMAL();
    }
  }, [loaded]);
  useEffect(() => {
    if (!rm_loading && loaded && !error && rm_data?.getReadManga.length > 0) {
      const index = chapters.findIndex(
        (chapter, i) =>
          chapter.chap_num == rm_data.getReadManga[0].last_read_chapter
      );
      if (chapters[index]) {
        setLastChapIdx(index);
        setLastChapLoaded(true);
      }
    }
  }, [rm_loading, loaded]);

  return (
    <MangaContext.Provider
      value={{ navigation, route, chapters, manga: { ...details, manga_id } }}
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
          error ? (
            alert(`There was an error : ${error}`)
          ) : mal ? (
            <MalModal
              modalVisible={malModalVisible}
              setModalVisible={setMalModalVisible}
              mal={mal}
              lastChapIdx={lastChapIdx}
            />
          ) : null
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
                  error ? (
                    <Text style={{ color: "white", fontSize: 20 }}>
                      There was an error {JSON.stringify(error)}
                    </Text>
                  ) : rm_data.getReadManga ? (
                    lastChapLoaded ? (
                      <View
                        style={{
                          width: "100%",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          marginTop: 5,
                          marginBottom: 30,
                        }}
                      >
                        <Text style={styles.lastReadLabel}>
                          Last Read Chapter
                        </Text>
                        <ChapterItem
                          borderColor={boneColor}
                          index={lastChapIdx}
                          uploadDateLabel={"Read date"}
                          date={rm_data.getReadManga[0].read_date}
                        />
                      </View>
                    ) : null
                  ) : null
                ) : null}
              </View>
            }
            ListEmptyComponent={
              <ActivityIndicator
                color={secondary_color}
                size="large"
                style={{ marginTop: 15 }}
              />
            }
            ref={scrollRef}
            keyExtractor={(item) => item.chap_num}
            renderItem={({ item, index }) => (
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
    width: "100%",
    height: "100%",
    backgroundColor: main_color,
  },
  lastReadLabel: {
    color: "white",
    opacity: 0.75,
    marginBottom: 25,
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "left",
  },
});
