import { View, Animated, StyleSheet, Dimensions } from "react-native";
import React, { useEffect, useRef } from "react";
import {
  boneColor,
  light_primary_color,
  primary_color,
  secondary_color,
} from "./variables";
import SkeletonContent from "react-native-skeleton-content";

const { width, height } = Dimensions.get("window");
export default function MangaSkeleton({ index, loaded }) {
  const initialArr = [1, 2, 3];
  const ChapterSkeleton = () => (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 0,
      }}
    >
      <View style={{ flex: 3.3, alignItems: "center" }}>
        <SkeletonContent
          containerStyle={styles.title}
          animationDirection="horizontalLeft"
          isLoading={!loaded}
          boneColor={boneColor}
          highlightColor={primary_color}
          layout={[
            {
              width: "100%",
              height: "90%",
              borderRadius: styles.title.borderRadius,
            },
          ]}
        />
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <SkeletonContent
          containerStyle={styles.title}
          animationDirection="horizontalLeft"
          isLoading={!loaded}
          boneColor={boneColor}
          highlightColor={primary_color}
          layout={[
            {
              width: "100%",
              height: "60%",
              marginTop: 5,
              borderRadius: styles.title.borderRadius,
            },
          ]}
        />
      </View>
    </View>
  );
  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <SkeletonContent
          containerStyle={styles.image}
          animationDirection="horizontalLeft"
          isLoading={!loaded}
          boneColor={boneColor}
          highlightColor={primary_color}
          layout={[
            {
              width: "100%",
            },
            styles.image,
          ]}
        />
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <View
            style={{
              flex: 1,
              width: "100%",
              justifyContent: "center",
              height: "40%",
              flexDirection: "row",
            }}
          >
            <SkeletonContent
              containerStyle={styles.title}
              animationDirection="horizontalLeft"
              isLoading={!loaded}
              boneColor={boneColor}
              highlightColor={primary_color}
              layout={[
                {
                  width: "100%",
                  height: "100%",
                  marginTop: 20,
                  borderRadius: styles.title.borderRadius,
                },
              ]}
            />
          </View>
          <View
            style={{
              flex: 1,
              width: "100%",
              height: "60%",
            }}
          >
            {initialArr.map((child) => {
              return <ChapterSkeleton key={child} />;
            })}
          </View>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    width: width - 20,
    height: height * 0.25,
    borderRadius: 10,
    flexDirection: "row",
    borderColor: primary_color,
    borderWidth: 2,
    padding: 10,
  },
  image: {
    width: 115,
    height: 170,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },

  title: {
    width: "75%",
    height: 20,
    borderRadius: 3,
  },
});
