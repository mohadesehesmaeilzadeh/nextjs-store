import { MockedProvider } from "@apollo/client/testing/react";
import { GET_NEWS } from "../../graphql/news";
import NewsList from "./NewsList";

const sampleNews = [
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
];

function withApolloMock(news) {
  return [
    {
      request: {
        query: GET_NEWS,
      },
      result: {
        data: {
          news,
        },
      },
    },
  ];
}

const meta = {
  title: "News/NewsList",
  component: NewsList,
  args: {
    endpointReady: true,
  },
};

export default meta;

export const Default = {
  decorators: [
    (Story) => (
      <MockedProvider mocks={withApolloMock(sampleNews)}>
        <Story />
      </MockedProvider>
    ),
  ],
};

export const Empty = {
  decorators: [
    (Story) => (
      <MockedProvider mocks={withApolloMock([])}>
        <Story />
      </MockedProvider>
    ),
  ],
};
