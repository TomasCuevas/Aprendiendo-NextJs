import Link from "next/link";

//* layouts *//
import { LightLayout } from "../../components/layouts/LightLayout";
import { MainLayout } from "../../components/layouts/MainLayout";

import Styles from "../../styles/Home.module.css";

export default function PricingPage() {
  return (
    <>
      <h1>Pricing Page</h1>
      <h1 className={Styles.title}>
        Ir a <Link href="/">Home</Link>
      </h1>

      <p className={Styles.description}>
        Get started by editing{" "}
        <code className={Styles.code}>pages/pricing/index.jsx</code>
      </p>
    </>
  );
}

PricingPage.getLayout = function getLayout(page: JSX.Element) {
  return (
    <MainLayout title="Pricing - Tomas" description="Pricing Page">
      {page}
    </MainLayout>
  );
};
