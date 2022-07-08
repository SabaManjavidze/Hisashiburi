import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  Animated,
  Alert,
  BackHandler,
  StatusBar,
} from "react-native";
import {
  main_url,
  domain,
  img_url,
  main_color,
  primary_color,
  secondary_color,
  clg,
} from "../../components/variables";
import {
  ActivityIndicator,
  Appbar,
  IconButton,
  Searchbar,
} from "react-native-paper";
import MangaCard from "../../components/MangaCard";
import { useAuth } from "../../Hooks/useAuth";
import MangaSkeleton from "../../components/MangaSkeleton";
import { useScrollToTop } from "@react-navigation/native";
import { debounce } from "lodash";

const { width, height } = Dimensions.get("window");

export default function HomePage({ navigation, route }) {
  const [data, setData] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const { token } = useAuth();
  const [input, setInput] = useState("");
  const [showInput, setShowInput] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const inputRef = useRef(null);
  const list_ref = useRef(null);
  const DE_DELAY = 500;
  const fetchHome = async () => {
    const url = `${main_url}/homepage?limit=20`;
    try {
      const res = await fetch(url);
      const json = await res.json();
      setData(json);
      setLoaded(true);
    } catch (error) {
      alert(error);
    }
  };
  async function fetchSearchResults(input) {
    try {
      const data = await fetch(`${main_url}/search/${input}?limit=15`);
      const json = await data.json();
      setData(json);
      setLoaded(true);
    } catch (error) {
      throw new Error(JSON.stringify(error, null, 2));
    }
  }

  useEffect(() => {
    if (input.length > 0) {
      fetchSearchResults(input);
    } else {
      fetchHome();
    }
    // console.log(token || "token is null");
  }, []);
  // const show_alert = () => {
  //   Alert.alert("Hold On!", "Are you sure you want to exit", [
  //     {
  //       text: "Cancel",
  //       onPress: () => null,
  //       style: "cancel",
  //     },
  //     {
  //       text: "Yes",
  //       onPress: () => {
  //         BackHandler.exitApp();
  //       },
  //     },
  //   ]);
  // };

  const renderItem = ({ item }) => {
    return <MangaCard route={route} navigation={navigation} item={item} />;
  };
  const backArrow = () => (
    <Appbar.Action
      style={{
        backgroundColor: secondary_color,
        rotation: -90,
        color: "white",
        borderRadius: 0,
      }}
      color="white"
      icon={"navigation"}
      onPress={() => {
        setShowInput(false);
        setInput("");
        fetchHome();
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: false,
        }).start();
      }}
    />
  );
  const debounceFn = useCallback(debounce(fetchSearchResults, DE_DELAY), []);
  const onChangeText = (text) => {
    setInput(text);
    text == "" ? fetchHome() : debounceFn(text);
  };
  return (
    <SafeAreaView
      style={{ alignItems: "center", flex: 1, backgroundColor: main_color }}
    >
      <Appbar.Header
        style={{
          width: "100%",
          backgroundColor: secondary_color,
          alignItems: "center",
        }}
      >
        {showInput || <Appbar.Content title="Hisashiburi" />}
        <Appbar.Action
          icon="magnify"
          style={{ display: showInput ? "none" : "flex", marginRight: 20 }}
          onPress={() => {
            setShowInput(true);
            inputRef.current.focus();
            Animated.spring(fadeAnim, {
              toValue: width * 0.95,
              useNativeDriver: false,
            }).start();
          }}
        />
        <Animated.View style={{ width: fadeAnim, flexDirection: "row" }}>
          <Searchbar
            placeholder="Search Manga"
            placeholderTextColor={"white"}
            onChangeText={onChangeText}
            // onSubmitEditing={(e) => {
            //   onSubmit(e);
            // }}
            value={input}
            ref={inputRef}
            selectionColor={primary_color}
            iconColor="white"
            onIconPress={() => {
              setInput("");
            }}
            inputStyle={{ color: "white" }}
            style={{
              backgroundColor: secondary_color,
              color: "white",
              shadowOpacity: 0,
              flex: 1,
            }}
            icon={backArrow}
          />
        </Animated.View>
      </Appbar.Header>
      <>
        {loaded ? (
          data.length > 0 ? (
            <FlatList
              data={data}
              renderItem={renderItem}
              ref={list_ref}
              onRefresh={() => {
                setLoaded(false);
                setData([]);
                fetchHome();
              }}
              refreshing={false}
              keyExtractor={(item) => item.manga_id}
              style={{ height: "100%", width: "100%" }}
              contentContainerStyle={{ alignItems: "center" }}
            />
          ) : (
            <View style={{ marginTop: 30 }}>
              <Text style={{ color: "white", fontSize: 20 }}>
                No results for "{input}"
              </Text>
            </View>
          )
        ) : (
          <View
            style={{
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* <FlatList
              data={initArray}
              renderItem={({ item, index }) => {
                return <MangaSkeleton index={index} loaded={loaded} />;
              }}
              keyExtractor={(item) => item.toString()}
              style={{ height: "100%", width: "100%" }}
            /> */}
            <ActivityIndicator size="large" color={primary_color} />
          </View>
        )}
      </>
    </SafeAreaView>
  );
}
