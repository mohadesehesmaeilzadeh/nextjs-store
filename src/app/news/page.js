import NewsList from "../../components/news/NewsList";

export const metadata = {
  title: "Store News | NextStore",
  description: "Read the latest demo store news from NextStore.",
};

export default function NewsPage() {
  return <NewsList pollInterval={30000} />;
}
