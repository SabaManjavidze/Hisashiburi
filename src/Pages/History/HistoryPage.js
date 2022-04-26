import React, { useRef, useEffect, useState } from "react";
import { View, Text, RefreshControl } from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { main_color } from "../../components/variables";
import { gql, useMutation, useQuery } from "@apollo/client";
import HistoryCard from "./components/HistoryCard";
import { TouchableRipple } from "react-native-paper";

const GET_USERS = gql`
  query GetUsers($user_id: Int!) {
    getUsers(user_id: $user_id) {
      user_id
      user_name
      manga {
        title
        manga_id
      }
    }
  }
`;

const REMOVE_READ_MANGA = gql`
  mutation RemoveReadManga($user_id: Float!, $manga_id: String!) {
    removeReadManga(options: { user_id: $user_id, manga_id: $manga_id })
  }
`;
export default function History({ navigation, route }) {
  const [manga, setManga] = useState([]);
  const [loading, setLoading] = useState(true);
  // const { user_id } = useAuth();
  const listRef = useRef(null);
  const {
    loading: user_loading,
    error,
    data,
    refetch,
  } = useQuery(GET_USERS, {
    variables: { user_id },
    pollInterval: 1000,
  });
  useEffect(() => {
    if (data) {
      setManga(data.getUsers[0].manga);
    }
    setLoading(user_loading);
  }, [data, loading]);

  const [
    removeReadManga,
    { loading: rm_loading, error: rm_error, data: rm_data },
  ] = useMutation(REMOVE_READ_MANGA);
  useEffect(() => {
    if (!rm_loading) {
      if (rm_data) {
        console.log(rm_data);
        // listRef.current.scrollToOffset({ animated: true, offset: 0 });
      }
      if (rm_error) {
        console.log(rm_error);
      }
    }
  }, [rm_loading]);

  const onDismiss = async (manga_id) => {
    // refetch query
    const filtered = manga.filter((m) => m.manga_id !== manga_id);
    setManga(filtered);
    try {
      await removeReadManga({
        variables: {
          // options: {
          user_id,
          manga_id,
          // },
        },
      });
    } catch (error) {
      console.log(JSON.stringify(error, null, 2));
    }
  };

  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: main_color,
        height: "100%",
        // flex: 1,
      }}
    >
      {/* {error
        ? console.log("   " + error.networkError.result.errors[0].message)
        : loading
        ? console.log("loading ...")
        : console.log(JSON.stringify(data.getUsers[0].manga, null, 2))} */}
      {!manga || manga.length == 0 ? (
        <View style={{ alignItems: "center" }}>
          <Text style={{ color: "white", fontSize: 15, textAlign: "center" }}>
            No Manga Read You Peasent
          </Text>
          <TouchableRipple
            style={{
              backgroundColor: "rgba(48, 119, 206, 0.39)",
              padding: 4,
              marginTop: 10,
            }}
            onPress={() => {
              refetch();
              setLoading(true);
            }}
          >
            <Text
              style={{
                color: "#5A9CF0",
                fontWeight: "bold",
                fontSize: 15,
                textAlign: "center",
              }}
            >
              Refresh
            </Text>
          </TouchableRipple>
        </View>
      ) : loading ? (
        <Text style={{ color: "white", fontSize: 25 }}>loading...</Text>
      ) : (
        <ScrollView
          ref={listRef}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={() => {
                refetch();
                setLoading(true);
              }}
            />
          }
        >
          {manga.map((item) => {
            return (
              <HistoryCard
                simultHandler={listRef}
                navigation={navigation}
                route={route}
                item={item}
                key={item.manga_id}
                onDismiss={onDismiss}
              />
            );
          })}
        </ScrollView>
        // <FlatList
        //   data={data.getUsers[0].manga}
        //   ref={listRef}
        //   renderItem={({ item }) => {
        //     return (
        //       <HistoryCard
        //         simultHandler={listRef}
        //         navigation={navigation}
        //         route={route}
        //         item={item}
        //       />
        //     );
        //   }}
        // onRefresh={() => {
        //   setLoaded(false);
        //   setData([]);
        //   fetchHome();
        // }}
        // refreshing={false}
        // keyExtractor={(item) => item.manga_id}
        // style={{ height: "100%", width: "100%" }}
        // style={{ flex: 1 }}
        // contentContainerStyle={{
        //   alignItems: "center",
        // }}
        //   />
      )}
    </View>
  );
}
