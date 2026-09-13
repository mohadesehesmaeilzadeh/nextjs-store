import { screen } from "@testing-library/react";
import { renderWithProviders } from "../../test-utils/renderWithProviders";
import NewsCard from "./NewsCard";

const news = {
  id: "1",
  title: "New Everyday Essentials Arrive This Week",
  description: "Fresh product notes are now available for the store.",
  image: "/images/products/desk-organizer.jpg",
  date: "2026-01-15",
};

describe("NewsCard", () => {
  it("renders the news title and description", () => {
    renderWithProviders(<NewsCard news={news} />);

    expect(screen.getByRole("heading", { name: news.title })).toBeInTheDocument();
    expect(screen.getByText(news.description)).toBeInTheDocument();
  });

  it("renders available image and date", () => {
    renderWithProviders(<NewsCard news={news} />);

    expect(screen.getByRole("img", { name: news.title })).toHaveAttribute(
      "src",
      news.image,
    );
    expect(screen.getByText("Jan 15, 2026")).toBeInTheDocument();
  });

  it("does not render an image when the image field is missing", () => {
    renderWithProviders(<NewsCard news={{ ...news, image: "" }} />);

    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });
});
