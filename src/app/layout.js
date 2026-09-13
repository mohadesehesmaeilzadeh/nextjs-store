import StyledComponentsRegistry from "../lib/registry";
import Providers from "./providers";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getAuthSession } from "../lib/auth";

export const metadata = {
  title: "NextStore",
  description: "A simple responsive online store built with Next.js.",
};

export default async function RootLayout({ children }) {
  const session = await getAuthSession();

  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <StyledComponentsRegistry>
          <Providers>
            <Header initialSession={session} />
            <main>{children}</main>
            <Footer />
          </Providers>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
