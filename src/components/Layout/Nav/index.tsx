"use client";

import { Button, IconButton, Link } from "@radix-ui/themes";
import { RiCommandLine, RiSettings3Line } from "@remixicon/react";
import { SunIcon, MoonIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";

import { useEffect, useState } from "react";

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
      <IconButton radius="full" variant="soft" onClick={toggleTheme}>
        {theme === "light" ? <SunIcon /> : <MoonIcon />}
      </IconButton>
      <Link href="/auth/login" className={styles.signInLink}>
        Sign In
      </Link>
    </nav>
  );
};

export default Nav;
