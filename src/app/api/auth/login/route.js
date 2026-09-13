import {
  createSessionToken,
  mockLogin,
  setAuthCookie,
} from "../../../../lib/auth";

export async function POST(request) {
  try {
    const credentials = await request.json();
    const user = await mockLogin(credentials);
    const token = createSessionToken(user);

    await setAuthCookie(token);

    return Response.json({ user });
  } catch (error) {
    return Response.json(
      { message: error.message || "Unable to sign in." },
      { status: 401 },
    );
  }
}
