import Link from "next/link";

import Styles from "./Navbar.module.css";

export const Navbar = () => {
  return (
    <nav className={Styles["menu-container"]}>
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
      <Link href="/contact">Contact</Link>
    </nav>
  );
};
