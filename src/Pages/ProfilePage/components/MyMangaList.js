import { View, Text, FlatList } from "react-native";
import React, { useEffect } from "react";
import MalCard from "../../../components/MalCard";
import ProfileHeader from "./ProfileHeader";
import { main_color } from "../../../components/variables";
import { useAuth } from "../../../Hooks/useAuth";
import { getProfile } from "../../../Services/MalServices";

export default function MyMangaList({
  mangaList,
  setMangaLoaded,
  setMangaList,
  getUserMangaList,
  showHeader,
  navigation,
  route,
}) {
  const { setUser, token } = useAuth();
  const renderItem = ({ item, index }) => {
    const { node } = item;
    return (
      <MalCard
        node={node}
        key={node.id}
        navigation={navigation}
        route={route}
      />
    );
  };
  return (
    <FlatList
      nestedScrollEnabled
      data={mangaList}
      renderItem={renderItem}
      keyExtractor={(item) => item.node.id}
      numColumns={2}
      onRefresh={async () => {
        setMangaLoaded(false);
        setMangaList([]);
        getUserMangaList();
        const user = await getProfile(token);
        setUser({
          user_id: user.id,
          user_name: user.name,
          picture: user.picture,
        });
      }}
      refreshing={false}
      ListHeaderComponent={showHeader ? <ProfileHeader /> : null}
      style={{
        height: "100%",
        width: "100%",
        backgroundColor: main_color,
      }}
    />
  );
}
