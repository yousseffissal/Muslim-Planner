import { createContext, useContext, useState, useEffect } from "react";
import api from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);

  // --- login ---
  const login = async (formData) => {
    try {
      const res = await api.post("/auth/login", formData);
      const { token } = res.data;

      localStorage.setItem("token", token);
      setToken(token);
      setIsAuthenticated(true);

      await fetchMe();
      console.log(user)
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
  };

  // --- getMe / fetchMe ---
  const fetchMe = async () => {
    if (!token) return;
    try {
      const res = await api.get("/user/me");
      setUser(res.data);
    } catch (err) {
      console.error("Failed to fetch user:", err.response?.data?.message || err.message);
      logout();
      throw err;
    }
  };

  useEffect(() => {
    if (token && !user) {
      fetchMe();
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, fetchMe, login, register, logout}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);