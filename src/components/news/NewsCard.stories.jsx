import NewsCard from "./NewsCard";

const sampleNews = {
  id: "1",
  title: "New Everyday Essentials Arrive This Week",
  description:
    "A compact edit of calm home, tech, and carry goods is now available in the store.",
  image: "/images/products/desk-organizer.jpg",
  date: "2026-01-15",
};

const meta = {
  title: "News/NewsCard",
  component: NewsCard,
  args: {
    news: sampleNews,
  },
};

export default meta;

export const Default = {};

export const LongTitle = {
  args: {
    news: {
      ...sampleNews,
      id: "2",
      title:
        "A Longer Store Update About Thoughtful Product Details and Seasonal Home Refreshes",
    },
  },
};

export const WithoutImage = {
  args: {
    news: {
      ...sampleNews,
      id: "3",
      image: "",
      title: "A Small Note From the Store Team",
    },
  },
};
