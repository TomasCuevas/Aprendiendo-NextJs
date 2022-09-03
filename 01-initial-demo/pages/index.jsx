import Link from "next/link";

//* layout *//
import { MainLayout } from "../components/layouts/MainLayout";

import styles from "../styles/Home.module.css";

export default function HomePage() {
  return (
    <MainLayout title="Home - Tomas" description="Home Page">
      <main className={styles.main}>
        <h1>Home Page</h1>
        <h1 className={styles.title}>
          Ir a <Link href="/about">About</Link>
        </h1>

        <p className={styles.description}>
          Get started by editing{" "}
          <code className={styles.code}>pages/index.jsx</code>
        </p>
      </main>
    </MainLayout>
  );
}
