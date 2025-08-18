import { useEffect, useState } from "react";
import { ThemeContext } from "../ThemeContext/DarkLight";

const ThemeProvider = ({ children }) => {

    const [mode, setMode] = useState(() => {
        if (typeof window !== "undefined") {
            return localStorage.getItem("mode") || "dark";
        }
        return "light"; 
    });


    useEffect(() => {
        localStorage.setItem("mode", mode);

        if (mode === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [mode]);

    const textClass = mode === "light" ? "text-gray-700" : "text-white";
    const cardBackground = mode === "light" ? "bg-white" : "bg-gray-800";

    const handleToggleMode = () => {
        setMode((prev) => (prev === "light" ? "dark" : "light"));
    };

    const themeMechanism = {
        mode,
        handleToggleMode,
        textClass,
        cardBackground,
    };

    return (
        <ThemeContext.Provider value={themeMechanism}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;