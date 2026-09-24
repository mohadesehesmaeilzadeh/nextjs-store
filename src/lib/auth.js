export const AUTH_STORAGE_KEY = "nextstore-session";

export const demoUser = {
  id: "demo-customer",
  name: "Demo Customer",
  email: "demo@nextstore.test",
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

export function readStoredAuthSession() {
  try {
    const session = JSON.parse(window.localStorage.getItem(AUTH_STORAGE_KEY));

    if (session?.id !== demoUser.id || session.email !== demoUser.email) {
      return null;
    }

    return {
      id: session.id,
      name: session.name || demoUser.name,
      email: session.email,
    };
  } catch {
    return null;
  }
}

export function storeAuthSession(session) {
  window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
}

export function clearStoredAuthSession() {
  window.localStorage.removeItem(AUTH_STORAGE_KEY);
}
