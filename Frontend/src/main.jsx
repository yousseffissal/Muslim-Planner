import React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./routers/router.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { ReaderProvider } from "./context/ReaderContext";
import './index.css';
import "./I18n/config";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider >
      <AuthProvider>
        <ReaderProvider>
          <RouterProvider router={router} />
        </ReaderProvider>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);