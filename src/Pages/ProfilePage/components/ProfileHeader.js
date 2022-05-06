import { Dimensions, Image, Text, View } from "react-native";
import { ActivityIndicator, TouchableRipple } from "react-native-paper";
import {
  boneColor,
  domain,
  main_color,
  mal_dict,
  primary_color,
  secondary_color,
} from "../../../components/variables";
import { useAuth } from "../../../Hooks/useAuth";
import React from "react";
import SkeletonContent from "react-native-skeleton-content";
import { logOut } from "../../../Services/MalServices";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
export default function ProfileHeader({ navigation, route }) {
  const { setUser, setToken, user: profile } = useAuth();
  return (
    <>
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          justifyContent: "center",
          marginVertical: 20,
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: "70%",
            backgroundColor: "transparent",
          }}
        >
          <Text
            style={{
              fontSize: 30,
              fontWeight: "bold",
              color: "white",
              textAlign: "center",
              left: 50,
            }}
          >
            {profile.name}
          </Text>
        </View>
        <View
          style={{
            width: "30%",
            alignItems: "center",
            backgroundColor: "transparent",
          }}
        >
          <TouchableRipple
            style={{
              backgroundColor: primary_color,
              // left: 80,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 10,
              padding: 10,
              maxWidth: "80%",
            }}
            onPress={async () => {
              await logOut();
              setToken(null);
              setUser(null);
            }}
          >
            <Text style={{ color: "white", fontSize: 20 }}>Log out</Text>
          </TouchableRipple>
        </View>
      </View>
      <View style={{ flex: 1, alignItems: "center" }}>
        {/* {console.log(profile_loaded)} */}
        <SkeletonContent
          isLoading={false}
          highlightColor={primary_color}
          // containerStyle={{ width: 180, height: 180 }}
          duration={1000}
          boneColor={"hsla(257, 27%, 50%, 0.6)"}
          animationDirection="diagonalDownRight"
        >
          <Image
            source={{ uri: profile.picture }}
            style={{ width: 200, height: 200 }}
          />
        </SkeletonContent>
      </View>
    </>
  );
}

// {profile_loaded ? (
// ) : (
//   <ActivityIndicator
//     size={50}
//     color={secondary_color}
//     style={{
//       width: "100%",
//       height: 300,
//       resizeMode: "cover",
//     }}
//   />
// )}
