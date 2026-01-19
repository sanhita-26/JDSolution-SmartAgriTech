import { createContext, useState, useEffect } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [language, setLanguage] = useState("mr"); // Marathi default
  const [loggedIn, setLoggedIn] = useState(false);

  // persist language across refresh
  useEffect(() => {
    const saved = localStorage.getItem("lang");
    if (saved) setLanguage(saved);
  }, []);

  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem("lang", lang);
  };

  return (
    <AppContext.Provider
      value={{
        language,
        changeLanguage,
        loggedIn,
        setLoggedIn,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};