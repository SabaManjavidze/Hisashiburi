import { View, Text, FlatList } from "react-native";
import React, { useEffect } from "react";
import MalCard from "../../../components/MalCard";
import ProfileHeader from "./ProfileHeader";
import { main_color } from "../../../components/variables";

export default function MyMangaList({
  mangaList,
  setMangaLoaded,
  setMangaList,
  getUserMangaList,
  showHeader,
  navigation,
  route,
}) {
  // useEffect(() => {
  //   console.log(mangaList.length);
  // }, []);

  const renderItem = ({ item, index }) => {
    const { node } = item;
    // console.log(JSON.stringify(node,null,2))
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
      onRefresh={() => {
        setMangaLoaded(false);
        setMangaList([]);
        getUserMangaList();
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
