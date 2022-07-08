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
  // mal_dict_manga,
  primary_color,
  secondary_color,
} from "../../../components/variables";
import { useAuth } from "../../../Hooks/useAuth";
import React, { useEffect, useState } from "react";
import { useGetManga } from "../../../Hooks/useGetManga";
import DescriptionView from "./DescriptionView";

const { width, height } = Dimensions.get("window");
export default function ListHeaderComponent({
  mal_loaded,
  loaded,
  poster,
  mal,
  setModalVisible,
  modalVisible,
}) {
  const { token } = useAuth();
  const { navigation, manga } = useGetManga();
  // useEffect(() => {
  //   console.log(poster);
  // }, [poster]);

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
      mal && setModalVisible(!modalVisible);
      // console.log(!modalVisible);
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
                  uri: poster,
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
              {mal_loaded && mal ? (
                <DescriptionView mal={mal} manga={manga} />
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
          width: width * 0.97,
          borderRadius: 15,
          height: 50,
          justifyContent: "center",
          marginTop: 20,
        }}
        onPress={onPress}
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

const styles = StyleSheet.create({});
