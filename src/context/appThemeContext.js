import React, { createContext, useState } from "react";

export const AppThemeContext = React.createContext();

export function ThemeContextProvider(props) {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const themeContextValue = {
    theme,
    setTheme,
    toggleTheme,
  };

  return (
    <AppThemeContext.Provider value={themeContextValue}>
      {props.children}
    </AppThemeContext.Provider>
  );
}
