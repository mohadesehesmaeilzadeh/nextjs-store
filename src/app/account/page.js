import AccountPageContent from "../../components/AccountPageContent";
import { requireAuth } from "../../lib/auth";

export const metadata = {
  title: "Account | NextStore",
  description: "View your signed-in NextStore demo account.",
};

export default async function AccountPage() {
  const session = await requireAuth();

  return <AccountPageContent session={session} />;
}
