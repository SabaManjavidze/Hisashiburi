import React, { useRef, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  SafeAreaView,
  Text,
  BackHandler,
  FlatList,
} from "react-native";
import { ActivityIndicator, Button, IconButton } from "react-native-paper";
import {
  domain,
  main_color,
  main_url,
  primary_color,
  top_manga_url,
} from "../../components/variables";
import { getTopManga } from "../../Services/MalServices";
import MalCard from "../../components/MalCard";
import { useAuth } from "../../Hooks/useAuth";
import MalSkeleton from "../../components/MalSkeleton";

export default function TopManga({ navigation, route }) {
  const [data, setData] = useState([]);
  const [paging, setPaging] = useState();
  const [loaded, setLoaded] = useState(false);
  const { token } = useAuth();
  const fields = `alternative_titles,mean,my_list_status{status,score}&limit=15`;
  const [currPage, setCurrPage] = useState(`${top_manga_url}${fields}`);
  const listRef = useRef(null);

  const getData = async () => {
    try {
      const resp = await getTopManga(token, currPage);
      setData([...data, ...resp.data]);
      setPaging(resp.paging);
      setLoaded(true);
    } catch (error) {
      alert(error);
    }
  };
  const renderItem = ({ item }) => (
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
  const initArray = [1, 2, 3, 4];
  return (
    <SafeAreaView style={{ backgroundColor: main_color, flex: 1 }}>
      {loaded ? (
        <View style={{ alignItems: "center" }}>
          <FlatList
            data={data}
            ref={listRef}
            renderItem={renderItem}
            onRefresh={() => {
              setLoaded(false);
              setCurrPage(top_manga_url + fields);
              setData([]);
              getData();
            }}
            refreshing={false}
            style={{ height: "100%", width: "100%" }}
            keyExtractor={(item) => item.node.id}
            onEndReached={loadMoreItems}
            onEndReachedThreshold={4}
            numColumns={2}
            ListFooterComponent={
              <ActivityIndicator
                style={{ padding: 25 }}
                animating={true}
                color={primary_color}
              />
            }
          />
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <View style={{ alignItems: "center" }}>
            <FlatList
              data={initArray}
              renderItem={() => {
                return <MalSkeleton />;
              }}
              keyExtractor={(item) => item.toString()}
              style={{ height: "100%", width: "100%" }}
              numColumns={2}
            />
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({});
