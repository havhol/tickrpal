"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type ThemeContextType = {
  theme: "light" | "dark";
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({
  children,
  accentColor = "orange",
}: {
  children: React.ReactNode;
  accentColor: "orange" | "blue" | "amber" | "green"; // Add more as needed
}) => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    // Load theme from localStorage or default to light
    const storedTheme = localStorage.getItem("theme") as "light" | "dark";
    const initialTheme = storedTheme || "light";
    document.documentElement.setAttribute("data-theme", initialTheme);
    document.documentElement.setAttribute("data-accent", accentColor);
    setTheme(initialTheme);
  }, [accentColor]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
