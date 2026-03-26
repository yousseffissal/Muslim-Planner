import { createContext, useContext, useState, useEffect } from "react";
import { themes } from "../tools/theme.js";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {

  // ✅ جلب القيمة من localStorage أول مرة
  const [mode, setMode] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  // ✅ تغيير الثيم

  const toggleTheme = () => {
    setMode(prev => (prev === "light" ? "dark" : "light"));
  }

  /*ThemeContext.js
  const toggleTheme = () => {
    setMode(prev => {
      if (prev === "light") return "dark";
      if (prev === "dark") return "gold";
      return "light";
    });
  };*/

  // ✅ حفظ الثيم في localStorage عند التغيير
  useEffect(() => {
    localStorage.setItem("theme", mode);
  }, [mode]);

  const value = {
    mode,
    theme: themes[mode],
    toggleTheme
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);