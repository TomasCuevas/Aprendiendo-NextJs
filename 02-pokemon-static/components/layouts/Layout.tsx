import Head from "next/head";

import { Navbar } from "../ui";

interface LayoutProps {
  children: JSX.Element | JSX.Element[];
  title?: string;
}

export const Layout = ({ children, title }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{title || "Pokemon App"}</title>
        <meta name="author" content="Tomas Cuevas" />
        <meta
          name="description"
          content={`Informacion sobre el pokemon ${title}`}
        />
        <meta name="keywords" content={`${title}, pokemon, pokedex`} />
      </Head>
      <Navbar />
      <main className="py-5">{children}</main>
    </>
  );
};
