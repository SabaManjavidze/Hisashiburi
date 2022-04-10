import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  Animated,
  AsyncStorage,
  Alert,
  BackHandler,
} from "react-native";
import {
  main_url,
  domain,
  img_url,
  main_color,
  primary_color,
  secondary_color,
} from "../../components/variables";
import {
  ActivityIndicator,
  Appbar,
  IconButton,
  Searchbar,
} from "react-native-paper";
import MangaCard from "../../components/MangaCard";
import { checkIfFavorited } from "../../Services/FavServices";
import { useAuth } from "../../Hooks/useAuth";
const AnimatedIcon = Animated.createAnimatedComponent(IconButton);

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default function HomePage({ navigation, route }) {
  const [data, setData] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const { token } = useAuth();
  const [input, setInput] = useState("");
  const [showInput, setShowInput] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const inputRef = useRef(null);

  const fetchData = async () => {
    const url = `${main_url}/homepage`;
    try {
      const res = await fetch(url);
      const json = await res.json();
      setData(json);
      setLoaded(true);
    } catch (error) {
      alert(error);
    }
  };

  const fetchResults = async () => {
    setLoaded(false);
    setData([]);
    const data = await fetch(`${main_url}/search/${input}`);
    const json = await data.json();
    setData(json);
    setLoaded(true);
  };

  useEffect(() => {
    fetchData();
    // console.log(token || "token is null");
    const backAction = () => {
      Alert.alert("Hold on!", "Are you sure you want to go back?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        { text: "YES", onPress: () => BackHandler.exitApp() },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      LoadHome
    );

    return () => backHandler.remove();
  }, []);
  const LoadHome = async () => {
    setShowInput(false);

    inputRef.current.clear();
    setInput("");
    setData([]);
    setLoaded(false);
    fetchData();

    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };
  const onSubmit = () => {
    if (input == null || input == "") {
      setData([]);
      setLoaded(false);
      fetchData();
    } else {
      fetchResults();
    }
  };
  const renderItem = (child) => {
    return (
      <MangaCard route={route} navigation={navigation} item={child.item} />
    );
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
      onPress={LoadHome}
    />
  );
  return (
    <SafeAreaView
      style={{ alignItems: "center", flex: 1, backgroundColor: main_color }}
    >
      <Appbar.Header
        style={{
          width: "100%",
          backgroundColor: main_color,
          alignItems: "center",
        }}
      >
        {showInput || (
          <Appbar.Content
            title="Hisashiburi"
            // title="baraqi shenstavs"
          />
        )}
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
            onChangeText={(input) => {
              setInput(input), input == "" && inputRef.current.focus();
            }}
            onSubmitEditing={(e) => {
              onSubmit(e);
            }}
            value={input}
            ref={inputRef}
            selectionColor={primary_color}
            iconColor="white"
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
      {loaded ? (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.manga_id}
          style={{ height: "100%", width: "100%" }}
          contentContainerStyle={{ alignItems: "center" }}
        />
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
          <ActivityIndicator animating={true} color={primary_color} />
        </View>
      )}
    </SafeAreaView>
  );
}
