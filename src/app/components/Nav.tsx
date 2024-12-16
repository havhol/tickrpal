"use client";

import { useEffect, useState } from "react";
import { IconButton } from "@radix-ui/themes";
import { RiSunLine, RiMoonLine } from "@remixicon/react";

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
    <nav className="flex items-center gap-4">
      {/* Login Link */}
      <a href="/login" className="text-sm text-gray-800 hover:underline">
        Login
      </a>

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
