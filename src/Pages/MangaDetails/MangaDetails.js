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
const { width, height } = Dimensions.get("window");

export default function MangaDetails({ navigation, route }) {
  const { item } = route.params;
  const { manga_id, title } = item;
  const { token, user } = useAuth();

  const [mal, setMAL] = useState();
  const [mal_loaded, setMALLoaded] = useState();

  const [chapters, setChapters] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const [poster, setPoster] = useState("");

  const [modalVisible, setModalVisible] = useState(false);

  const [lastChapIdx, setLastChapIdx] = useState(0);

  const scrollRef = useRef(null);

  const { data, loading, error, refetch } = useQuery(GET_READ_MANGA, {
    variables: { user_id: user.user_id, manga_id: manga_id },
  });

  const fetchChapters = async () => {
    const json = await fetchData(manga_id);
    const { details, chapters } = json;
    setPoster(details.img_url);
    setChapters(chapters);
    setLoaded(true);
  };

  const fetchMAL = async () => {
    const data = await getMangaOnMAL(title, token);
    setMAL(data);
    setMALLoaded(true);
  };
  useEffect(() => {
    fetchChapters();
    token && fetchMAL();
  }, []);
  useEffect(() => {
    if (!loading) {
      chapters.findIndex((chapter, i) => {
        if (chapter.chap_num == data.getReadManga[0].last_read_chapter) {
          setLastChapIdx(chapters.length - 1 - i);
        }
      });
    }
  }, [loading]);

  return (
    <MangaContext.Provider
      value={{ navigation, route, chapters, manga_id, title }}
    >
      <View style={styles.container}>
        <StatusBar backgroundColor={main_color} translucent />
        <ChapterSearchModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />

        <DetailsAppbar />

        <FAB
          setModalVisible={setModalVisible}
          modalVisible={modalVisible}
          loading={loading}
          data={data}
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
                  poster={poster}
                  mal={mal}
                  mal_loaded={mal_loaded}
                  loaded={loaded}
                />
                {loading ? null : mal.my_list_status ? (
                  <View
                    style={{
                      width: "100%",
                      alignItems: "center",
                      marginVertical: 40,
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        opacity: 0.75,
                        marginLeft: 65,
                        marginBottom: 25,
                        fontWeight: "bold",
                        fontSize: 20,
                        width: "100%",
                        textAlign: "left",
                      }}
                    >
                      Last Read
                    </Text>
                    {lastChapIdx ? (
                      <ChapterItem
                        // child={{
                        //   ...chapters[lastChapIdx],
                        //   upload_date: data.getReadManga[0].read_date,
                        // }}
                        borderColor={boneColor}
                        index={lastChapIdx}
                      />
                    ) : null}
                  </View>
                ) : null}
              </View>
            }
            ref={scrollRef}
            keyExtractor={(item) => item.chap_title}
            renderItem={({ item, index }) => (
              <ChapterItem child={item} index={index} key={index} />
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
});
