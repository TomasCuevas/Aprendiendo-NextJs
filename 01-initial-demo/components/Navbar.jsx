import { ActiveLink } from "./ActiveLink";

import Styles from "./Navbar.module.css";

const menuItems = [
  {
    text: "Home",
    href: "/",
  },
  {
    text: "About",
    href: "/about",
  },
  {
    text: "Contact",
    href: "/contact",
  },
  {
    text: "Pricing",
    href: "/pricing",
  },
];

export const Navbar = () => {
  return (
    <nav className={Styles["menu-container"]}>
      {menuItems.map((item, index) => (
        <ActiveLink
          key={`${index}${Math.random()}`}
          text={item.text}
          href={item.href}
        />
      ))}
    </nav>
  );
};
