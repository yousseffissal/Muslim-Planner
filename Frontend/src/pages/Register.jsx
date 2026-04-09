// src/pages/Register.jsx
import { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import successIcon from "../assets/success.png";
import { useTheme } from "../context/ThemeContext";
import { useTranslation } from "react-i18next";
import i18n from "i18next";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", famillyname: "", gender: "male", email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { theme } = useTheme();
  const { t } = useTranslation("auth");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await register(form);
      setSuccess(t("auth.register.success"));
      navigate("/app/dashboard");
      await Swal.fire({
        title: t("auth.register.accountCreated"),
        text: t("auth.register.accountCreatedText"),
        imageUrl: successIcon,
        imageWidth: 80,
        imageHeight: 80,
        imageAlt: t("auth.register.imageAlt"),
        confirmButtonText: t("auth.register.ok"),
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
        confirmButtonText: t("auth.register.ok"),
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
    <div
      dir={i18n.language === "ar" ? "rtl" : "ltr"} // اتجاه الصفحة خاص بهذا Component فقط
      className="min-h-screen flex items-center justify-center px-2"
      style={{ background: theme.quranpage }}
    >
      <div
        className="shadow-2xl rounded-2xl p-10 w-full max-w-md animate-fadeIn"
        style={{ background: theme.card }}
      >
        <h1 className="text-3xl font-bold text-center mb-6" style={{ color: theme.navbarlogo }}>
          {t("auth.register.title")}
        </h1>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {success && <p className="text-green-600 text-center mb-4">{success}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5" style={{ color: theme.cardtext }}>
          <input
            type="text"
            name="username"
            placeholder={t("auth.register.username")}
            value={form.username}
            onChange={handleChange}
            required
            className="rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            style={{ background: theme.card, border: `1px solid ${theme.navbarlogo}` }}
          />

          <input
            type="text"
            name="famillyname"
            placeholder={t("auth.register.famillyname")}
            value={form.famillyname}
            onChange={handleChange}
            required
            className="rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            style={{ background: theme.card, border: `1px solid ${theme.navbarlogo}` }}
          />

          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
            required
            className="rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            style={{ background: theme.card, border: `1px solid ${theme.navbarlogo}` }}
          >
            <option value="" disabled>{t("auth.register.gender")}</option>
            <option value="male">{t("auth.register.male")}</option>
            <option value="female">{t("auth.register.female")}</option>
          </select>

          <input
            type="email"
            name="email"
            placeholder={t("auth.register.email")}
            value={form.email}
            onChange={handleChange}
            required
            className="rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            style={{ background: theme.card, border: `1px solid ${theme.navbarlogo}` }}
          />

          <input
            type="password"
            name="password"
            placeholder={t("auth.register.password")}
            value={form.password}
            onChange={handleChange}
            required
            className="rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            style={{ background: theme.card, border: `1px solid ${theme.navbarlogo}` }}
          />

          <button
            type="submit"
            className="text-white font-semibold py-3 rounded-lg transition-colors shadow-md"
            style={{ background: theme.navbarlogo }}
          >
            {t("auth.register.button")}
          </button>
        </form>

        <p className="mt-6 text-center" style={{ color: theme.cardtext }}>
          <div>
            {t("auth.register.haveAccount")}{" "}
            <Link to="/login" className="font-medium hover:underline" style={{ color: theme.navbarlogo }}>
              {t("auth.register.loginHere")}
            </Link>
          </div>

          <Link to="/" className="font-medium text-xs hover:underline" style={{ color: theme.cardtext, opacity: "0.50" }}>
            {t("auth.register.backHome")}
          </Link>
        </p>
      </div>
    </div>
  );
}