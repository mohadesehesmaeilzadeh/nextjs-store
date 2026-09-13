import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const AUTH_COOKIE_NAME = "nextstore_session";

export const demoUser = {
  id: "demo-customer",
  name: "Demo Customer",
  email: "demo@nextstore.test",
};

const sessionMaxAge = 60 * 60 * 24 * 7;

export const authCookieOptions = {
  httpOnly: true,
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: sessionMaxAge,
};

function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export async function mockLogin({ email, password }) {
  await delay(500);

  const normalizedEmail = String(email || "").trim().toLowerCase();
  const normalizedPassword = String(password || "").trim();

  if (!normalizedEmail || !normalizedPassword) {
    throw new Error("Email and password are required.");
  }

  if (normalizedEmail !== demoUser.email || normalizedPassword.length < 8) {
    throw new Error(
      "Invalid login. Use demo@nextstore.test and any password with at least 8 characters.",
    );
  }

  return demoUser;
}

export function createSessionToken(user) {
  const session = {
    sub: user.id,
    name: user.name,
    email: user.email,
    issuedAt: Date.now(),
  };

  return Buffer.from(JSON.stringify(session)).toString("base64url");
}

export function readSessionFromToken(token) {
  if (!token) return null;

  try {
    const session = JSON.parse(Buffer.from(token, "base64url").toString("utf8"));

    if (session.sub !== demoUser.id || session.email !== demoUser.email) {
      return null;
    }

    return {
      id: session.sub,
      name: session.name || demoUser.name,
      email: session.email,
    };
  } catch {
    return null;
  }
}

export async function getAuthSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;

  return readSessionFromToken(token);
}

export async function requireAuth() {
  const session = await getAuthSession();

  if (!session) {
    redirect("/login");
  }

  return session;
}

export async function setAuthCookie(token) {
  const cookieStore = await cookies();

  cookieStore.set({
    name: AUTH_COOKIE_NAME,
    value: token,
    ...authCookieOptions,
  });
}

export async function clearAuthCookie() {
  const cookieStore = await cookies();

  cookieStore.set({
    name: AUTH_COOKIE_NAME,
    value: "",
    ...authCookieOptions,
    maxAge: 0,
  });
}
