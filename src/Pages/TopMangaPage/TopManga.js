import React, { useRef, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  SafeAreaView,
  Text,
  Dimensions,
  TouchableOpacity,
  AsyncStorage,
  Animated,
  BackHandler,
} from "react-native";
import { ActivityIndicator, Button, IconButton } from "react-native-paper";
import {
  domain,
  main_color,
  main_url,
  primary_color,
  top_manga_url,
} from "../../components/variables";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { getTopManga } from "../../Services/MalServices";
import MalCard from "../../components/MalCard";
import { useAuth } from "../../Hooks/useAuth";
import MalSkeleton from "../../components/MalSkeleton";

export default function TopManga({ navigation, route }) {
  const [data, setData] = useState([]);
  const [paging, setPaging] = useState();
  const [currPage, setCurrPage] = useState(top_manga_url);
  const [loaded, setLoaded] = useState(false);
  const { token } = useAuth();
  const listRef = useRef(null);

  const getData = async () => {
    try {
      setData([]);
      setLoaded(false);
      setPaging(null);
      const resp = await getTopManga(token, currPage);
      setData([...data, ...resp.data]);
      setPaging(resp.paging);
      setLoaded(true);
    } catch (error) {
      alert(error);
    }
  };
  const renderItem = ({ item }) => (
    // console.log({ title: item.node.title, img: item.node.main_picture.large }),
    <MalCard node={item.node} route={route} navigation={navigation} />
  );
  useEffect(() => {
    getData();
  }, [currPage]);
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      getData
    );

    return () => backHandler.remove();
  }, []);
  const loadMoreItems = () => {
    setCurrPage(paging.next);
    // console.log("first");
    // console.log(JSON.stringify(data));
  };
  const initArray = [1, 2, 3, 4, 5];
  return (
    <SafeAreaView style={{ backgroundColor: main_color, flex: 1 }}>
      {loaded ? (
        <View style={{ alignItems: "center" }}>
          <FlatList
            data={data}
            ref={listRef}
            renderItem={renderItem}
            style={{ height: "100%", width: "100%" }}
            keyExtractor={(item) => item.node.id}
            onEndReached={loadMoreItems}
            onEndReachedThreshold={3}
            numColumns={2}
            ListFooterComponent={
              <ActivityIndicator animating={true} color={primary_color} />
            }
          />
        </View>
      ) : (
        <Animated.View style={{ flex: 1 }}>
          <Animated.View style={{ alignItems: "center" }}>
            {/* {[...Array(5)].map((_, i) => (
              <MalSkeleton key={i} />
            ))} */}
            <FlatList
              data={initArray}
              renderItem={() => {
                return <MalSkeleton />;
              }}
              keyExtractor={(item) => item.toString()}
              style={{ height: "100%", width: "100%" }}
              numColumns={2}
            />
          </Animated.View>
        </Animated.View>
      )}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({});
