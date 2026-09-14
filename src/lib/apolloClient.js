import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  Observable,
} from "@apollo/client";

export const fakeqlEndpoint = process.env.NEXT_PUBLIC_FAKEQL_ENDPOINT || "";

export const demoNewsItems = [
  {
    id: "1",
    title: "New Everyday Essentials Arrive This Week",
    description:
      "A compact edit of calm home, tech, and carry goods is now available in the store.",
    image: "/images/products/desk-organizer.jpg",
    date: "2026-01-15",
  },
  {
    id: "2",
    title: "Behind the Edit: Warm Materials and Simple Shapes",
    description:
      "The latest collection keeps useful objects easy to compare and simple to bring home.",
    image: "/images/products/ceramic-travel-mug.jpg",
    date: "2026-02-04",
  },
  {
    id: "3",
    title: "Fresh Carry Goods Added to the Store",
    description:
      "Everyday bags and compact accessories join the NextStore sample collection.",
    image: "/images/products/everyday-backpack.jpg",
    date: "2026-03-10",
  },
];

function createDemoNewsLink() {
  return new ApolloLink(() => {
    return new Observable((observer) => {
      observer.next({
        data: {
          news: demoNewsItems,
        },
      });
      observer.complete();
    });
  });
}

export function createApolloClient() {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: fakeqlEndpoint
      ? new HttpLink({
          uri: fakeqlEndpoint,
        })
      : createDemoNewsLink(),
  });
}

const apolloClient = createApolloClient();

export default apolloClient;
