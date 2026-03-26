import { createContext, useContext, useState, useEffect } from "react";
import api from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);
  const [loading, setLoading] = useState(true); // 🔥 NEW

  // --- login ---
  const login = async (formData) => {
    try {
      const res = await api.post("/auth/login", formData);
      const { token } = res.data;

      localStorage.setItem("token", token);
      setToken(token);
      setIsAuthenticated(true);

    } catch (err) {
      if (err.response) {
        const error = new Error(err.response.data.message || "Something went wrong");
        error.status = err.response.status;
        throw error;
      } else {
        throw new Error("Network error");
      }
    }
  };

  // --- register ---
  const register = async (formData) => {
    try {
      await api.post("/auth/register", formData);
      await login({ email: formData.email, password: formData.password });
    } catch (err) {
      if (err.response) {
        const error = new Error(err.response.data.message || "Something went wrong");
        error.status = err.response.status;
        throw error;
      } else {
        throw new Error("Network error");
      }
    }
  };

  // --- logout ---
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    localStorage.setItem("tutorial_seen", "false");
  };

  // --- fetchMe ---
  const fetchMe = async () => {
    if (!token) {
      setLoading(false); // 🔥 مهم
      return;
    }

    try {
      const res = await api.get("/user/me");
      setUser(res.data);
    } catch (err) {
      console.error("Failed to fetch user:", err.response?.data?.message || err.message);
      logout();
    } finally {
      setLoading(false); // 🔥 مهم جدا
    }
  };

  useEffect(() => {
    if (token) {
      fetchMe();
    } else {
      setLoading(false);
    }
  }, [token]); // 🔥 مهم

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading, // 🔥 NEW
        fetchMe,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);