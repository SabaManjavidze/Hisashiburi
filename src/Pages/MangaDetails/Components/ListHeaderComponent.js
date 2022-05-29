import { Dimensions, Image, Text, View } from "react-native";
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
          width: 200,
          height: 300,
        }}
      >
        {loaded ? (
          <Image
            source={{
              uri: `${domain}${poster}`,
            }}
            style={{
              width: "100%",
              height: 300,
              resizeMode: "cover",
            }}
          />
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
