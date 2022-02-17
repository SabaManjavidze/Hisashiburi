import React, {
  useRef,
  useEffect,
  useState,
  useContext,
  useCallback,
} from "react";
import {
  StyleSheet,
  View,
  Image,
  SafeAreaView,
  Text,
  Dimensions,
  TouchableOpacity,
  AsyncStorage,
} from "react-native";
import { ActivityIndicator, Button, IconButton } from "react-native-paper";
import {
  domain,
  main_color,
  main_url,
  primary_color,
} from "../components/variables";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { getTopManga } from "../Services/MalServices";
import MalCard from "../components/MalCard";
import { useAuth } from "../Hooks/useAuth";

export default function TopManga({ navigation, route }) {
  const [data, setData] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const { token } = useAuth();
  const listRef = useRef(null);

  const getData = async () => {
    const { data } = await getTopManga(token);
    setData(data);
    setLoaded(true);
  };
  const renderItem = ({ item }) => (
    <MalCard node={item.node} route={route} navigation={navigation} />
  );
  useEffect(() => {
    getData();
  }, []);
  return (
    <SafeAreaView style={{ backgroundColor: main_color, flex: 1 }}>
      {loaded ? (
        <View style={{ alignItems: "center" }}>
          <FlatList
            data={data}
            renderItem={renderItem}
            style={{ height: "100%", width: "100%" }}
            keyExtractor={(item) => item.node.id}
            numColumns={2}
          />
          {/* {loaded &&
              data.map((child) => {
                return (
                  <MalCard node={child} navigation={navigation} route={route} />
                );
              })} */}
        </View>
      ) : (
        <ActivityIndicator animating={true} color={primary_color} />
      )}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({});
