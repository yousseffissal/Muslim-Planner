// src/components/PrivateRoute.jsx
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useTheme } from "../context/ThemeContext";

export default function PrivateRoute() {
  const { isAuthenticated, loading } = useAuth();
   const { theme } = useTheme();

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center"
      style={{ background: theme.card }}>
        <div className="flex flex-col items-center">
          {/* Spinner */}
          <div className="w-12 h-12 rounded-full animate-spin mb-4"
          style={{border: `4px solid ${theme.navbarlogo}`,  borderTopColor: "transparent" }}></div>
          <p className="font-medium text-lg"
          style={{ color: theme.cardtext }}>Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}