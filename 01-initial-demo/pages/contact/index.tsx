import Link from "next/link";

//* layout *//
import { MainLayout } from "../../components/layouts/MainLayout";

import styles from "../../styles/Home.module.css";

export default function ContactPage() {
  return (
    <MainLayout title="Contact - Tomas" description="Contact Page">
      <h1>Contact Page</h1>
      <h1 className={styles.title}>
        Ir a <Link href="/">Home</Link>
      </h1>

      <p className={styles.description}>
        Get started by editing{" "}
        <code className={styles.code}>pages/contact.jsx</code>
      </p>
    </MainLayout>
  );
}
