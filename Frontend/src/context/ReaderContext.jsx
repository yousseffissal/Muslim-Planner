// src/context/ReaderContext.js
import { createContext, useContext, useState, useEffect } from "react";

const ReaderContext = createContext();

export const ReaderProvider = ({ children }) => {
    const [selectedReader, setSelectedReader] = useState("");

    useEffect(() => {
        const saved = localStorage.getItem("reader");
        if (saved) setSelectedReader(JSON.parse(saved));
    }, []);

    useEffect(() => {
        if (selectedReader) {
            localStorage.setItem("reader", JSON.stringify(selectedReader));
        }
    }, [selectedReader]);

    return (
        <ReaderContext.Provider value={{ selectedReader, setSelectedReader }}>
            {children}
        </ReaderContext.Provider>
    );
};

// Hook للاستخدام في أي Component
export const useReader = () => useContext(ReaderContext);