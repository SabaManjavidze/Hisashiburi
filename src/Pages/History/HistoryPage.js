import React, { useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  RefreshControl,
  StyleSheet,
  StatusBar,
} from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import {
  main_color,
  primary_color,
  secondary_color,
} from "../../components/variables";
import { gql, useMutation, useQuery } from "@apollo/client";
import HistoryCard from "./components/HistoryCard";
import { ActivityIndicator, TouchableRipple } from "react-native-paper";
import { useAuth } from "../../Hooks/useAuth";
import { formatDate } from "../../utils/formatDate";
import HistoryCardAnim from "./components/HistoryCardAnim";
import { useIsFocused } from "@react-navigation/native";
import { REMOVE_READ_MANGA } from "../../graphql/Mutations";
import { GET_USERS } from "../../graphql/Queries";

export default function History({ navigation, route }) {
  const [manga, setManga] = useState([]);
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(true);

  const {
    token,
    user: { user_id },
  } = useAuth();

  const listRef = useRef(null);
  const {
    loading: user_loading,
    data,
    error,
    refetch,
  } = useQuery(GET_USERS, {
    variables: { user_id: user_id },
  });

  useEffect(() => {
    if (isFocused) {
      refetch();
    }
  }, [isFocused]);

  useEffect(() => {
    if (token && !user_loading) {
      const manga_list = data.getUsers[0].manga;
      // sort manga_list by read_date
      if (!manga_list) {
        setManga([]);
        setLoading(false);
        return;
      }
      const sorted_manga = [...manga_list].sort((a, b) => {
        return new Date(b.read_date) - new Date(a.read_date);
      });
      setManga(sorted_manga);
      setLoading(false);
    }
  }, [user_loading, data, loading]);

  const [
    removeReadManga,
    { loading: rm_loading, error: rm_error, data: rm_data },
  ] = useMutation(REMOVE_READ_MANGA);

  const onDismiss = async (manga_id) => {
    // refetch query
    const filtered = manga.filter((m) => m.manga_id !== manga_id);
    setManga(filtered);
    try {
      await removeReadManga({
        variables: {
          user_id,
          manga_id,
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
      <StatusBar
        animated={false}
        backgroundColor={secondary_color}
        hidden={false}
        style={"light"}
      />
      {!token ? (
        <Text style={styles.text}>Log in to see your history</Text>
      ) : loading ? (
        <View
          style={{
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator size="large" color={primary_color} />
        </View>
      ) : manga && manga.length <= 0 ? (
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
