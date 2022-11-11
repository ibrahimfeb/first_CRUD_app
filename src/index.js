import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import { ChakraProvider } from "@chakra-ui/react";

//Initialize Apollo Client for hasura connection
const client = new ApolloClient({
  uri: "https://gql-practice-01.hasura.app/v1/graphql",
  cache: new InMemoryCache({ addTypename: false }),
  headers: {
    "Access-Control-Allow-Origin": "*",
    "X-Hasura-Admin-Secret":
      "TDMpN0hSk0sIb7JWNmVsjOMNvC7IdIpE7Jm3hkDngjeIjoNOefd9XpSl9TkXn22j",
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <ChakraProvider>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </ChakraProvider>
  </React.StrictMode>
);

reportWebVitals();
