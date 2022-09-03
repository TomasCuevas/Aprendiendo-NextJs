import { ActiveLink } from "./ActiveLink";

import Styles from "./Navbar.module.css";

export const Navbar = () => {
  return (
    <nav className={Styles["menu-container"]}>
      <ActiveLink text="Home" href="/" />
      <ActiveLink text="About" href="/about" />
      <ActiveLink text="Contact" href="/contact" />
    </nav>
  );
};
