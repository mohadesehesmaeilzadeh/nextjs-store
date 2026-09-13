import { redirect } from "next/navigation";
import LoginForm from "../../components/LoginForm";
import { getAuthSession } from "../../lib/auth";

export const metadata = {
  title: "Login | NextStore",
  description: "Sign in to the NextStore demo account.",
};

export default async function LoginPage() {
  const session = await getAuthSession();

  if (session) {
    redirect("/");
  }

  return <LoginForm />;
}
