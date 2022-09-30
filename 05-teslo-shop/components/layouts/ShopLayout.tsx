import Head from "next/head";

//* components *//
import { Navbar } from "../ui/Navbar";
import { SideMenu } from "../ui/SideMenu";

//* interfaces *//
interface ShopLayoutProps {
  children: React.ReactNode;
  title: string;
  pageDescription: string;
  imageFullUrl?: string;
}

export const ShopLayout = ({
  children,
  title,
  pageDescription,
  imageFullUrl,
}: ShopLayoutProps) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={pageDescription} />
        <meta name="og:title" content={title} />
        <meta name="og:description" content={pageDescription} />
        {imageFullUrl && <meta name="og:image" content={imageFullUrl} />}
      </Head>

      <nav>
        <Navbar />
      </nav>

      <SideMenu />

      <main
        style={{ margin: "80px auto", maxWidth: "1440px", padding: "0 30px" }}
      >
        {children}
      </main>

      <footer></footer>
    </>
  );
};
