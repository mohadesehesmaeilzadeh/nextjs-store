import {
  AUTH_STORAGE_KEY,
  clearStoredAuthSession,
  demoUser,
  mockLogin,
  readStoredAuthSession,
  storeAuthSession,
} from "./auth";

describe("mock auth helpers", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("accepts the demo email and a long enough password", async () => {
    await expect(
      mockLogin({ email: "DEMO@nextstore.test", password: "password123" }),
    ).resolves.toEqual(demoUser);
  });

  it("rejects missing or invalid credentials", async () => {
    await expect(mockLogin({ email: "", password: "" })).rejects.toThrow(
      /required/i,
    );
    await expect(
      mockLogin({ email: "wrong@example.com", password: "password123" }),
    ).rejects.toThrow(/invalid login/i);
  });

  it("stores and reads the demo session", () => {
    storeAuthSession(demoUser);

    expect(readStoredAuthSession()).toEqual(demoUser);
  });

  it("returns null for invalid stored sessions", () => {
    window.localStorage.setItem(AUTH_STORAGE_KEY, "not-valid-json");
    expect(readStoredAuthSession()).toBeNull();

    window.localStorage.setItem(
      AUTH_STORAGE_KEY,
      JSON.stringify({ id: "other-user", email: "other@example.com" }),
    );
    expect(readStoredAuthSession()).toBeNull();
  });

  it("clears a stored session", () => {
    storeAuthSession(demoUser);
    clearStoredAuthSession();

    expect(readStoredAuthSession()).toBeNull();
  });
});
