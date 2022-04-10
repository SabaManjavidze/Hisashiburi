import { View, Text } from "react-native";
import React from "react";
import { gql, useQuery } from "@apollo/client";
import { ScrollView } from "react-native";
export default function GraphqlTest() {
  const GET_USERS = gql`
    {
      getUsers {
        picture
        user_id
        user_name
      }
    }
  `;
  const { loading, data, error } = useQuery(GET_USERS);
  if (loading)
    return (
      <Text style={{ textAlign: "center", fontSize: 20, marginTop: 100 }}>
        Loading...
      </Text>
    );
  if (error)
    return (
      <ScrollView>
        <Text style={{ textAlign: "center", fontSize: 20 }}>
          Error : {JSON.stringify(error, null, 2)}
        </Text>
      </ScrollView>
    );

  return <Text>{JSON.stringify(data || [], null, 2)}</Text>;
}
