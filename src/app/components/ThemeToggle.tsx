"use client";

import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") as "light" | "dark";
    const initialTheme = storedTheme || "light";
    document.documentElement.className = initialTheme; // Set the class on <html>
    document.documentElement.style.colorScheme = initialTheme; // Update color-scheme
    setTheme(initialTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    document.documentElement.className = newTheme; // Update <html> class
    document.documentElement.style.colorScheme = newTheme; // Update color-scheme
    localStorage.setItem("theme", newTheme); // Persist in localStorage
    setTheme(newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className="bg-gray-200 text-black dark:bg-gray-700 dark:text-white rounded-full px-4 py-2 shadow-md transition-colors"
    >
      {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
    </button>
  );
};

export default ThemeToggle;
