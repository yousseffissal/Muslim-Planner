// src/routers/router.jsx
import { createBrowserRouter } from "react-router-dom";
import App from "../App.jsx";
import AdhanTime from "../pages/AdhanTime.jsx";
import Welcome from "../pages/Welcome.jsx";
import ErrorPage from "../pages/ErrorPage.jsx";
import QuranPage from "../pages/QuranPage.jsx";
import OwnerPage from "../pages/OwnerPage.jsx";
import LandingPage from "../pages/Landing.jsx";
import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";
import PrivateRoute from "../components/PrivateRoute.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
    errorElement: <ErrorPage />
  },
  {
    path: "login",
    element: <Login />,
    errorElement: <ErrorPage />
  },
  {
    path: "register",
    element: <Register />,
    errorElement: <ErrorPage />
  },
  {
    path: "/app",
    element: <PrivateRoute />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <App />,
        children: [
          {
            path: "dashboard",
            element: <Welcome />
          },
          {
            path: "prayer-times",
            element: <AdhanTime />
          },
          {
            path: "quran",
            element: <QuranPage />
          },
          {
            path: "about",
            element: <OwnerPage />
          },
        ]
      }
    ]
  }
]);

export default router;