import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { products } from "../test-utils/productFixtures";
import { renderWithProviders } from "../test-utils/renderWithProviders";
import StorePage from "./StorePage";

describe("StorePage", () => {
  it("renders the store hero and server product data", () => {
    renderWithProviders(<StorePage products={products} />);

    expect(
      screen.getByRole("heading", { name: /quietly useful pieces/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /shop the edit/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(`${products.length} products`)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /explore products/i })).toHaveAttribute(
      "href",
      "#products",
    );

    products.forEach((product) => {
      expect(screen.getByRole("heading", { name: product.name })).toBeInTheDocument();
    });
  });

  it("shows the catalog empty state", () => {
    renderWithProviders(<StorePage products={[]} />);

    expect(
      screen.getByRole("heading", { name: "No products are available." }),
    ).toBeInTheDocument();
  });

  it("applies combined filters and clears every control", async () => {
    const user = userEvent.setup();

    renderWithProviders(<StorePage products={products} />);

    await user.type(screen.getByLabelText("Search"), "speaker");
    await user.selectOptions(screen.getByLabelText("Category"), "Electronics");
    await user.type(screen.getByLabelText("Minimum price"), "60");
    await user.type(screen.getByLabelText("Maximum price"), "70");

    expect(screen.getByText("1 product")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Bluetooth Speaker" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "Wireless Headphones" }),
    ).not.toBeInTheDocument();

    await user.selectOptions(screen.getByLabelText("Sort by"), "price-desc");
    await user.click(screen.getByRole("button", { name: "Clear Filters" }));

    expect(screen.getByLabelText("Search")).toHaveValue("");
    expect(screen.getByLabelText("Category")).toHaveValue("");
    expect(screen.getByLabelText("Minimum price")).toHaveValue(null);
    expect(screen.getByLabelText("Maximum price")).toHaveValue(null);
    expect(screen.getByLabelText("Sort by")).toHaveValue("");
    expect(screen.getByText(`${products.length} products`)).toBeInTheDocument();
  });

  it("shows a useful empty state and resets it", async () => {
    const user = userEvent.setup();

    renderWithProviders(<StorePage products={products} />);

    await user.type(screen.getByLabelText("Search"), "not a product");

    expect(
      screen.getByRole("heading", { name: "No products match your filters." }),
    ).toBeInTheDocument();
    expect(screen.getByText("0 products")).toBeInTheDocument();

    const clearButtons = screen.getAllByRole("button", { name: "Clear Filters" });
    await user.click(clearButtons.at(-1));

    expect(
      screen.queryByRole("heading", { name: "No products match your filters." }),
    ).not.toBeInTheDocument();
    expect(screen.getByText(`${products.length} products`)).toBeInTheDocument();
  });

  it("sorts products through every available order", async () => {
    const user = userEvent.setup();

    renderWithProviders(<StorePage products={products} />);

    const visibleProductNames = () =>
      screen
        .getAllByRole("article")
        .map((article) => within(article).getByRole("heading").textContent);

    await user.selectOptions(screen.getByLabelText("Sort by"), "price-asc");
    expect(visibleProductNames()).toEqual([
      "Ceramic Coffee Mug",
      "Desk Organizer",
      "Smart Desk Lamp",
      "Cotton Throw Blanket",
      "Bluetooth Speaker",
      "Everyday Backpack",
      "Wireless Headphones",
      "Minimal Watch",
    ]);

    await user.selectOptions(screen.getByLabelText("Sort by"), "price-desc");
    expect(visibleProductNames()).toEqual([
      "Minimal Watch",
      "Wireless Headphones",
      "Everyday Backpack",
      "Bluetooth Speaker",
      "Cotton Throw Blanket",
      "Smart Desk Lamp",
      "Desk Organizer",
      "Ceramic Coffee Mug",
    ]);

    await user.selectOptions(screen.getByLabelText("Sort by"), "name-asc");
    expect(visibleProductNames()).toEqual(
      products.map((product) => product.name).toSorted(),
    );
  });
});
