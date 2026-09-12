import StyledComponentsRegistry from "../lib/registry";
import Providers from "./providers";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata = {
  title: "NextStore",
  description: "A simple responsive online store built with Next.js.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <StyledComponentsRegistry>
          <Providers>
            <Header />
            <main>{children}</main>
            <Footer />
          </Providers>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
