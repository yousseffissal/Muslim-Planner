// src/context/ReaderContext.js
import { createContext, useContext, useState, useEffect } from "react";
import { arabicQuranReaders as readers } from "../tools/readers";

const ReaderContext = createContext();

export const ReaderProvider = ({ children }) => {
    const [selectedReader, setSelectedReader] = useState(readers[0]);

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