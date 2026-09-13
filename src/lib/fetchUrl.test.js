import { fetchUrl } from "./fetchUrl";

describe("fetchUrl", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("requires a URL", async () => {
    await expect(fetchUrl()).rejects.toThrow("A request URL is required.");
  });

  it("returns parsed JSON when the response is ok", async () => {
    const payload = [{ id: "1", name: "Wireless Headphones" }];
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(payload),
    });

    await expect(fetchUrl("/products")).resolves.toEqual(payload);
    expect(global.fetch).toHaveBeenCalledWith("/products", {});
  });

  it("uses an API error message when available", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 404,
      json: jest.fn().mockResolvedValue({ message: "Product not found." }),
    });

    await expect(fetchUrl("/products/999")).rejects.toThrow("Product not found.");
  });

  it("falls back to the status message when an error body cannot be parsed", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 500,
      json: jest.fn().mockRejectedValue(new Error("No JSON")),
    });

    await expect(fetchUrl("/products")).rejects.toThrow(
      "Request failed with status 500.",
    );
  });
});
