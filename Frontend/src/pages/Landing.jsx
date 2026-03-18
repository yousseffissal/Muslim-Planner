import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function LandingPage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect if user is already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/app/dashboard");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      {/* Navbar */}
      <header className="flex justify-between items-center px-8 py-6 shadow-md">
        <h1 className="text-2xl font-bold text-green-700">MuslimTasks</h1>
        <nav className="space-x-4">
          <Link
            to="/login"
            className="text-gray-700 hover:text-green-700 transition"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="bg-green-700 hover:bg-green-800 text-white px-5 py-2 rounded-lg text-sm font-medium transition"
          >
            Get Started
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col items-center text-center px-6 py-28 bg-green-50">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-green-900">
          Organize Your Daily Worship Effortlessly
        </h1>
        <p className="max-w-2xl text-gray-700 mb-8 text-lg">
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