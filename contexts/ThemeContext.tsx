import React, { createContext, useContext, useState, useEffect } from "react";
import { Appearance, ColorSchemeName } from "react-native";
import { PSBTheme } from "../utils/PSBColors";

export interface Theme {
  isDark: boolean;
  colors: {
    background: Array<string>; // For light and dark mode
    surface: string;
    card: string;
    text: string;
    textSecondary: string;
    primary: string;
    success: string;
    warning: string;
    error: string;
    icon: string;
    border: string;
    shadow: string;
    profit: string;
    loss: string;
    breakEven: string;
    gradientStart: string;
    gradientEnd: string;
  };
}

const lightTheme: Theme = PSBTheme.light;
const darkTheme: Theme = PSBTheme.dark;

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const colorScheme = Appearance.getColorScheme();
    setIsDark(colorScheme === "dark");

    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setIsDark(colorScheme === "dark");
    });

    return () => subscription?.remove();
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const theme = isDark ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
