import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

export const fakeqlEndpoint = process.env.NEXT_PUBLIC_FAKEQL_ENDPOINT || "";

export function createApolloClient() {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: fakeqlEndpoint || "/api/fakeql-endpoint-not-configured",
    }),
  });
}

const apolloClient = createApolloClient();

export default apolloClient;
