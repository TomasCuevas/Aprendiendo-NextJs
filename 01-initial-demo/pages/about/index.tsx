import Link from "next/link";

//* layout *//
import { MainLayout } from "../../components/layouts/MainLayout";
import { LightLayout } from "../../components/layouts/LightLayout";

import styles from "../../styles/Home.module.css";

export default function AboutPage() {
  return (
    <>
      <h1>About Page</h1>
      <h1 className={styles.title}>
        Ir a <Link href="/">Home</Link>
      </h1>

      <p className={styles.description}>
        Get started by editing{" "}
        <code className={styles.code}>pages/about/index.jsx</code>
      </p>
    </>
  );
}

AboutPage.getLayout = function getLayout(page) {
  return (
    <MainLayout title="About - Tomas" description="About Page">
      <LightLayout>{page}</LightLayout>
    </MainLayout>
  );
};
