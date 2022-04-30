import React, { useRef, useEffect, useState } from "react";
import { View, Text, RefreshControl, StyleSheet } from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { main_color } from "../../components/variables";
import { gql, useMutation, useQuery } from "@apollo/client";
import HistoryCard from "./components/HistoryCard";
import { TouchableRipple } from "react-native-paper";
import { useAuth } from "../../Hooks/useAuth";
import { formatDate } from "../../utils/formatDate";
import HistoryCardAnim from "./components/HistoryCardAnim";
import { useIsFocused } from "@react-navigation/native";

const GET_USERS = gql`
  query GetUsers($user_id: Int!) {
    getUsers(user_id: $user_id) {
      user_id
      user_name
      manga {
        manga_details {
          title
          manga_id
        }
        read_date
        last_read_chapter
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
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(true);

  const {
    token,
    user: { id },
  } = useAuth();

  const listRef = useRef(null);
  const {
    loading: user_loading,
    data,
    refetch,
  } = useQuery(GET_USERS, {
    variables: { user_id: id },
  });

  useEffect(() => {
    if (isFocused) {
      refetch();
    }
  }, [isFocused]);

  useEffect(() => {
    if (!user_loading && data) {
      const manga_list = data.getUsers[0].manga;
      // sort manga_list by read_date

      const sorted_manga = [...manga_list].sort((a, b) => {
        return new Date(b.read_date) - new Date(a.read_date);
      });
      // sorted_manga.map((item, i) => {
      //   console.log(`${i + 1}.  ${item.manga_details.title}`);
      // });
      setManga(sorted_manga);
      setLoading(false);
    }
  }, [user_loading, loading, data]);
  const [
    removeReadManga,
    { loading: rm_loading, error: rm_error, data: rm_data },
  ] = useMutation(REMOVE_READ_MANGA);

  // useEffect(() => {
  //   if (!rm_loading) {
  //     if (rm_data) {
  //       console.log(rm_data);
  // listRef.current.scrollToOffset({ animated: true, offset: 0 });
  //     }
  //     if (rm_error) {
  //       console.log(rm_error);
  //     }
  //   }
  // }, [rm_loading]);

  const onDismiss = async (manga_id) => {
    // refetch query
    const filtered = manga.filter((m) => m.manga_id !== manga_id);
    setManga(filtered);
    try {
      await removeReadManga({
        variables: {
          // options: {
          user_id: id,
          manga_id,
          // },
        },
      });
      refetch();
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
      {!token ? (
        <Text style={styles.text}>Log in to see your history</Text>
      ) : loading ? (
        <Text style={styles.text}>loading...</Text>
      ) : !manga || manga.length == 0 ? (
        <View style={{ alignItems: "center" }}>
          <Text style={[styles.text, { textAlign: "center" }]}>
            No Manga Read You Peasent
          </Text>
          <TouchableRipple
            style={{
              backgroundColor: "rgba(48, 119, 206, 0.39)",
              padding: 4,
              marginTop: 10,
            }}
            onPress={() => {
              setLoading(true);
              refetch();
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
      ) : (
        <ScrollView
          ref={listRef}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={async () => {
                await refetch();
                setLoading(true);
              }}
            />
          }
        >
          {manga.map((item) => {
            return (
              <HistoryCardAnim
                simultHandler={listRef}
                navigation={navigation}
                route={route}
                item={item}
                key={item.manga_details.manga_id}
                onDismiss={onDismiss}
              />
            );
          })}
        </ScrollView>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  text: { color: "white", fontSize: 25 },
});
