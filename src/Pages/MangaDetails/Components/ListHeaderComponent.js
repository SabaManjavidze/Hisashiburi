import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { ActivityIndicator, TouchableRipple } from "react-native-paper";
import {
  domain,
  main_color,
  mal_dict,
  primary_color,
  secondary_color,
} from "../../../components/variables";
import { useAuth } from "../../../Hooks/useAuth";
import React from "react";
import { useGetManga } from "../../../Hooks/useGetManga";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
export default function ListHeaderComponent({
  mal_loaded,
  loaded,
  poster,
  mal,
}) {
  const { token } = useAuth();
  const { navigation } = useGetManga();
  const getStatus = () => {
    if (mal !== null && mal) {
      if (mal.my_list_status == null) {
        return "Add To My List";
      } else {
        return mal_dict[mal.my_list_status.status].text;
      }
    }
    return "This Manga Is Not On MyAnimeList";
  };

  const onPress = async () => {
    if (token) {
      // add to MAL
    } else {
      navigation.navigate("LogIn");
    }
  };
  return (
    <View
      style={{
        width: "100%",
        alignItems: "center",
        marginBottom: 20,
      }}
    >
      <View
        style={{
          width: "100%",
          height: 300,
        }}
      >
        {loaded ? (
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              flex: 1,
              alignItems: "center",
              // marginHorizontal: 20,
            }}
          >
            <View
              style={
                mal
                  ? {
                      width: "50%",
                      // backgroundColor: "yellow",
                      alignItems: "flex-end",
                    }
                  : { width: "100%", alignItems: "center" }
              }
            >
              <Image
                source={{
                  uri: `${domain}${poster}`,
                }}
                style={
                  mal
                    ? {
                        width: "85%",
                        height: "100%",
                        resizeMode: "cover",
                      }
                    : {
                        width: 170,
                        height: "100%",
                      }
                }
              />
            </View>
            <View
              style={{
                width: "50%",
                alignItems: "center",
                justifyContent: "center",
                // backgroundColor: "red",
              }}
            >
              {mal ? (
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
                  <Text style={styles.descText}>
                    Status :
                    <Text style={{ color: mal_dict[mal.status].color }}>
                      {mal_dict[mal.status].text}
                    </Text>
                  </Text>
                  <Text style={styles.descText}>
                    Popularity : #{mal.popularity}
                  </Text>
                  <Text style={styles.descText}>
                    Members : {mal.num_list_users}
                  </Text>
                  <Text style={styles.descText}>
                    Author(s) :{" "}
                    {mal.authors.map((item) => {
                      return item.node.id;
                    })}
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
              ) : null}
            </View>
          </View>
        ) : (
          <ActivityIndicator
            size="large"
            color={secondary_color}
            style={{
              width: "100%",
              height: 300,
              resizeMode: "cover",
            }}
          />
        )}
      </View>

      <TouchableRipple
        style={{
          borderColor: primary_color,
          borderWidth: 1,
          backgroundColor: secondary_color,
          width: windowWidth * 0.97,
          borderRadius: 15,
          height: 50,
          justifyContent: "center",
          marginTop: 20,
        }}
        onPress={() => onPress()}
      >
        {token ? (
          mal_loaded ? (
            <Text
              style={{
                color: "white",
                textAlign: "center",
                fontSize: 20,
              }}
            >
              {getStatus()}
            </Text>
          ) : (
            <ActivityIndicator
              size="small"
              color={primary_color}
              style={{
                width: "100%",
                height: 300,
                resizeMode: "cover",
              }}
            />
          )
        ) : (
          <Text
            style={{
              color: "white",
              textAlign: "center",
              fontSize: 20,
            }}
          >
            Sign In To Add To Your List
          </Text>
        )}
      </TouchableRipple>
    </View>
  );
}

const styles = StyleSheet.create({
  descText: {
    color: "white",
    textAlign: "center",
  },
});
