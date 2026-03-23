import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import bg from "../assets/background2.jpg"
import { useTheme } from "../context/ThemeContext";
import ThemeToggle from "../components/ThemeToggle.jsx"

export default function LandingPage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
   const { theme } = useTheme();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/app/dashboard");
    }
  }, [isAuthenticated, navigate]);


  useEffect(() => {
    const root = document.documentElement;
  
    root.style.setProperty("--scroll-track", theme.scrollTrack);
    root.style.setProperty("--scroll-thumb", theme.scrollThumb);
    root.style.setProperty("--scroll-thumb-hover", theme.scrollThumbHover);
  }, [theme]);
  

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      {/* Navbar */}
      <header className="flex justify-between items-center px-5 py-5 shadow-md">

        <div className='flex justify-center items-center gap-2'>
          <img src="/Icon.png" alt="Muslim Planner Logo" className="h-7 w-7" />
          <span className="text-2xl font-bold"
            style={{ color: theme.navbarlogo }}>
            Muslim Planner
          </span>
        </div>

        <nav className="flex gap-2">
          <Link
            to="/login"
            className="bg-green-700 hover:bg-green-800 text-white px-5 py-2 rounded-lg text-sm font-medium transition"
          >
            Login
          </Link>
          <ThemeToggle />
        </nav>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col items-center text-center px-6 py-28 "
        style={{
          background: `url(${bg})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-green-600">
          Organize Your Daily Worship Effortlessly
        </h1>
        <p className="max-w-2xl text-white mb-8 text-lg">
          Track your daily Muslim tasks like prayers, Quran reading, dhikr, and good habits, all in one place.
        </p>
        <Link
          to="/register"
          className="bg-green-700 hover:bg-green-800 text-white px-8 py-3 text-lg rounded-xl font-semibold transition"
        >
          Start Now
        </Link>
      </section>

      {/* Features */}
      <section className="grid md:grid-cols-3 gap-8 px-8 py-20">
        <div className="border rounded-3xl p-8 shadow hover:shadow-lg transition">
          <h3 className="text-xl font-semibold mb-3 text-green-700">Task Management</h3>
          <p className="text-gray-600">Easily add, organize, and track your daily tasks.</p>
        </div>

        <div className="border rounded-3xl p-8 shadow hover:shadow-lg transition">
          <h3 className="text-xl font-semibold mb-3 text-green-700">Quran Progress</h3>
          <p className="text-gray-600">Monitor and record your Quran reading journey.</p>
        </div>

        <div className="border rounded-3xl p-8 shadow hover:shadow-lg transition">
          <h3 className="text-xl font-semibold mb-3 text-green-700">Daily Motivation</h3>
          <p className="text-gray-600">Stay consistent and motivated in your acts of worship.</p>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center py-20 bg-green-50">
        <h2 className="text-3xl font-bold mb-6 text-green-900">Begin Your Journey Today</h2>
        <Link
          to="/register"
          className="bg-green-700 hover:bg-green-800 text-white px-10 py-4 rounded-xl font-semibold text-lg transition"
        >
          Create Account
        </Link>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 border-t text-sm text-gray-500">
        © 2026 MuslimTasks - All rights reserved
      </footer>
    </div>
  );
}