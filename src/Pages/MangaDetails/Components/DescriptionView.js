import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { mal_dict, mal_dict_manga } from "../../../components/variables";

export default function DescriptionView({ mal }) {
  return (
    <ScrollView
      nestedScrollEnabled
      contentContainerStyle={{
        width: "95%",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30,
        paddingBottom: 60,
      }}
    >
      <Text style={styles.descText}>Score : {mal.mean}</Text>
      {mal.my_list_status && mal.my_list_status.score ? (
        <Text style={styles.descText}>
          My Score : {mal.my_list_status.score}
        </Text>
      ) : null}
      {mal.my_list_status ? (
        <Text style={styles.descText}>
          My Status :
          <Text style={{ color: mal_dict[mal.my_list_status.status].color }}>
            {mal_dict[mal.my_list_status.status].text}
          </Text>
        </Text>
      ) : null}
      {mal.my_list_status && mal.my_list_status.num_chapters_read ? (
        <Text style={{ color: "white" }}>
          Chapters Read : {mal.my_list_status.num_chapters_read}
        </Text>
      ) : null}
      <Text style={styles.descText}>
        Status :
        <Text
          style={[styles.descText, { color: mal_dict_manga[mal.status].color }]}
        >
          {mal_dict_manga[mal.status].text}
        </Text>
      </Text>
      <Text style={styles.descText}>Popularity : #{mal.popularity}</Text>
      <Text style={styles.descText}>Members : {mal.num_list_users}</Text>
      <Text style={styles.descText}>
        Author(s) :{" "}
        {mal.authors
          ? mal.authors.map((item) => {
              return item.node.id;
            })
          : "No authors"}
        {/* {JSON.stringify(mal.authors, null, 2)} */}
      </Text>
      <Text
        style={{
          color: "white",
          textAlign: "center",
          marginTop: 20,
          // overflow: "scroll",
        }}
      >
        Synopsis : {"\n"}
        {mal.synopsis}
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  descText: {
    color: "white",
    textAlign: "center",
  },
});
