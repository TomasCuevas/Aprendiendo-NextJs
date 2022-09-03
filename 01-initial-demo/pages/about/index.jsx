import Link from "next/link";

//* layout *//
import { MainLayout } from "../../components/layouts/MainLayout";

import styles from "../../styles/Home.module.css";

export default function AboutPage() {
  return (
    <MainLayout title="About - Tomas" description="About Page">
      <h1>About Page</h1>
      <h1 className={styles.title}>
        Ir a <Link href="/">Home</Link>
      </h1>

      <p className={styles.description}>
        Get started by editing{" "}
        <code className={styles.code}>pages/about.jsx</code>
      </p>
    </MainLayout>
  );
}
