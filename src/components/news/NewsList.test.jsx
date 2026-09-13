import { MockedProvider } from "@apollo/client/testing/react";
import { render, screen, waitFor } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import { GET_NEWS } from "../../graphql/news";
import { theme } from "../../styles/theme";
import NewsList from "./NewsList";

const sampleNews = [
  {
    id: "1",
    title: "New Everyday Essentials Arrive This Week",
    description: "Fresh product notes are now available for the store.",
    image: "/images/products/desk-organizer.jpg",
    date: "2026-01-15",
  },
  {
    id: "2",
    title: "Behind the Edit",
    description: "A short update about warm materials and useful shapes.",
    image: "/images/products/ceramic-travel-mug.jpg",
    date: "2026-02-04",
  },
];

function renderNewsList(mocks) {
  return renderWithTheme(
    <MockedProvider mocks={mocks}>
      <NewsList endpointReady />
    </MockedProvider>,
  );
}

function renderWithTheme(ui) {
  return render(ui, {
    wrapper: ({ children }) => (
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    ),
  });
}

function createNewsMock({ data, error }) {
  const mock = {
    request: {
      query: GET_NEWS,
    },
  };

  if (error) {
    mock.error = error;
  } else {
    mock.result = {
      data,
    };
  }

  return mock;
}

describe("NewsList", () => {
  it("shows the loading state", () => {
    renderNewsList([createNewsMock({ data: { news: sampleNews } })]);

    expect(screen.getByRole("heading", { name: /loading news/i })).toBeInTheDocument();
  });

  it("renders multiple news items from the GraphQL response", async () => {
    renderNewsList([createNewsMock({ data: { news: sampleNews } })]);

    await waitFor(() => {
      expect(
        screen.getByRole("heading", { name: sampleNews[0].title }),
      ).toBeInTheDocument();
    });

    expect(screen.getByRole("heading", { name: sampleNews[1].title })).toBeInTheDocument();
  });

  it("shows an error state when the GraphQL request fails", async () => {
    renderNewsList([createNewsMock({ error: new Error("Network error") })]);

    await waitFor(() => {
      expect(
        screen.getByRole("heading", { name: /unable to load news/i }),
      ).toBeInTheDocument();
    });
  });

  it("handles an empty news response", async () => {
    renderNewsList([createNewsMock({ data: { news: [] } })]);

    await waitFor(() => {
      expect(
        screen.getByRole("heading", { name: /no news available/i }),
      ).toBeInTheDocument();
    });
  });

  it("shows an error state when the FakeQL endpoint is not configured", () => {
    renderWithTheme(
      <MockedProvider>
        <NewsList endpointReady={false} />
      </MockedProvider>,
    );

    expect(
      screen.getByRole("heading", { name: /unable to load news/i }),
    ).toBeInTheDocument();
  });
});
