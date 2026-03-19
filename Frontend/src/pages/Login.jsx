// src/pages/Login.jsx
import { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import successIcon from "../assets/success.png";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await login(form);
      navigate("/app/dashboard");
      await Swal.fire({
        title: "Welcome Back",
        imageUrl: successIcon,
        imageWidth: 80,
        imageHeight: 80,
        imageAlt: "Custom icon",
        confirmButtonText: "OK",
        customClass: {
          popup: "swal-popup-green",
          title: "swal-title-green",
          content: "swal-content-green",
          confirmButton: "swal-btn-green",
        },
        buttonsStyling: false,
      });
    } catch (err) {
      setError(err.message);
      Swal.fire({
        text: err.message,
        icon: "error",
        confirmButtonText: "OK",
        customClass: {
          popup: "swal-popup-red",
          title: "swal-title-red",
          content: "swal-content-red",
          confirmButton: "swal-btn-red",
        },
        buttonsStyling: false,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 px-2">
      <div className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-md animate-fadeIn">
        <h1 className="text-3xl font-bold text-center mb-6 text-green-700">Login</h1>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {success && <p className="text-green-600 text-center mb-4">{success}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="border border-green-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="border border-green-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
          />
          <button
            type="submit"
            className="bg-green-600 text-white font-semibold py-3 rounded-lg hover:bg-green-700 transition-colors shadow-md"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          Don't have an account?{" "}
          <Link to="/register" className="text-green-600 font-medium hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}