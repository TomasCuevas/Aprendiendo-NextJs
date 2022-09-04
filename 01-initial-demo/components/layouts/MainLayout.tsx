import Head from "next/head";

//* components *//
import { Navbar } from "../Navbar";

import Styles from "./MainLayout.module.css";

interface MainLayoutProps {
  title: string;
  description: string;
  children: React.ReactNode | React.ReactNode[];
}

export const MainLayout = ({
  title,
  description,
  children,
}: MainLayoutProps) => {
  return (
    <div className={Styles.container}>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main className={Styles.main}>{children}</main>
    </div>
  );
};
