import { View, Text } from "react-native";
import React from "react";
import { AuthProvider } from "./src/Hooks/useAuth";
import MainNavigation from "./src/MainNavigation";
import { Provider } from "react-native-paper";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { graphql_url } from "./src/components/variables";

const client = new ApolloClient({
  // uri: "http://10.0.2.2:3000/graphql",
  uri: graphql_url,
  cache: new InMemoryCache(),
  connectToDevTools: true,
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <Provider>
          <MainNavigation />
        </Provider>
      </AuthProvider>
    </ApolloProvider>
  );
}
