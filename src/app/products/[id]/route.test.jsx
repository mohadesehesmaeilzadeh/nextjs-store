import { screen } from "@testing-library/react";
import { notFound } from "next/navigation";
import { getProductById } from "../../../lib/productCatalog";
import { renderWithProviders } from "../../../test-utils/renderWithProviders";
import ProductRouteLoading from "./loading";
import ProductNotFound from "./not-found";
import ProductPage from "./page";

jest.mock("../../../lib/productCatalog", () => ({
  getProductById: jest.fn(),
}));

describe("product route states", () => {
  it("shows the product loading state", () => {
    renderWithProviders(<ProductRouteLoading />);

    expect(screen.getByRole("status")).toHaveTextContent("Loading product...");
  });

  it("renders the custom product not-found state", () => {
    renderWithProviders(<ProductNotFound />);

    expect(
      screen.getByRole("heading", { name: "Product not found" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /back to store/i })).toHaveAttribute(
      "href",
      "/",
    );
  });

  it("uses the App Router not-found boundary for a missing product", async () => {
    const notFoundError = new Error("NEXT_NOT_FOUND");
    getProductById.mockResolvedValue(null);
    notFound.mockImplementationOnce(() => {
      throw notFoundError;
    });

    await expect(
      ProductPage({ params: Promise.resolve({ id: "999999" }) }),
    ).rejects.toBe(notFoundError);

    expect(getProductById).toHaveBeenCalledWith("999999");
    expect(notFound).toHaveBeenCalledTimes(1);
  });
});
