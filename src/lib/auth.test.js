import {
  createSessionToken,
  demoUser,
  mockLogin,
  readSessionFromToken,
} from "./auth";

describe("mock auth helpers", () => {
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

  it("creates and reads a simple mock session token", () => {
    const token = createSessionToken(demoUser);

    expect(readSessionFromToken(token)).toEqual({
      id: demoUser.id,
      name: demoUser.name,
      email: demoUser.email,
    });
  });

  it("returns null for invalid session tokens", () => {
    expect(readSessionFromToken("not-valid-json")).toBeNull();
    expect(readSessionFromToken()).toBeNull();
  });
});
