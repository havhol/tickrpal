"use client";

import { IconButton, Link } from "@radix-ui/themes";
import { RiMoonLine, RiSunLine } from "@remixicon/react";
import { useEffect, useState } from "react";

import SearchBar from "../SearchCompanies";
import styles from "./styles.module.scss";

const Nav = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") as "light" | "dark";
    const initialTheme = storedTheme || "light";
    document.documentElement.className = initialTheme; // Set theme class on <html>
    setTheme(initialTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    document.documentElement.className = newTheme; // Update <html> class
    localStorage.setItem("theme", newTheme); // Save preference in localStorage
    setTheme(newTheme);
  };

  return (
    <nav className={styles.nav}>
      <SearchBar />
      <Link href="/signin" color="gray">
        Sign in
      </Link>

      {/* Theme Toggle */}
      <IconButton radius="full" variant="soft" onClick={toggleTheme}>
        {theme === "light" ? (
          <RiSunLine size={20} color="currentColor" />
        ) : (
          <RiMoonLine size={20} color="currentColor" />
        )}
      </IconButton>
    </nav>
  );
};

export default Nav;
