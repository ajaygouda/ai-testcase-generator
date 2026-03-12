"use client"
import { createContext, useContext, useEffect, useState } from "react";

export type Theme = "light" | "dark" | "blue" | "green";

const ThemeContext = createContext<{ theme: Theme; setTheme: (t: Theme) => void }>({ theme: "dark", setTheme: () => { } });

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<Theme>("dark");

    useEffect(() => {
        const saved = localStorage.getItem("theme") as Theme | null;
        if (saved) setTheme(saved);
    }, []);

    useEffect(() => {
        const root = document.documentElement;
        root.classList.remove("light", "dark", "blue", "green");
        root.classList.add(theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export function useTheme() {
    return useContext(ThemeContext);
}