import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import bg from "../assets/background2.jpg";
import { useTheme } from "../context/ThemeContext";
import ThemeToggle from "../components/ThemeToggle.jsx";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { useTranslation } from "react-i18next";
import i18n from "i18next";
import LanguageDropdown from "../components/LanguageDropdown";

export default function LandingPage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { t } = useTranslation("landing");

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/app/dashboard");
    }
  }, [isAuthenticated, navigate]);

  // نزيل تغيير document.documentElement.dir لأنه يطبق على كل التطبيق
  // useEffect(() => {
  //   document.documentElement.dir =
  //     i18n.language === "ar" ? "rtl" : "ltr";
  // }, [i18n.language]);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--scroll-track", theme.scrollTrack);
    root.style.setProperty("--scroll-thumb", theme.scrollThumb);
    root.style.setProperty("--scroll-thumb-hover", theme.scrollThumbHover);
  }, [theme]);

  return (
    // نضيف dir هنا فقط على الـ Component
    <div
      dir={i18n.language === "ar" ? "rtl" : "ltr"}
      className="min-h-screen"
      style={{ background: theme.navbar }}
    >
      {/* Navbar */}
      <header
        className="flex justify-between items-center md:px-6 md:py-5 px-5 py-4 shadow-md"
        dir={"ltr"}
      >
        <div className="flex justify-center items-center gap-2">
          <img src="/Icon.png" alt="Muslim Planner Logo" className="md:h-7 md:w-7 h-6 w-6" />
          <span className="md:text-2xl text-xl font-bold" style={{ color: theme.navbarlogo }}>
            Muslim Planner
          </span>
        </div>

        <div className="flex gap-4 justify-center items-center">
          <LanguageDropdown />
          <ThemeToggle />
        </div>
      </header>

      {/* Hero Section */}
      <section
        className="relative flex justify-center items-center"
        style={{
          background: `url(${bg})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute top-0 left-0 w-full h-full z-0 bg-black/55" />
        <div className="flex flex-col items-center text-center px-6 py-28 z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-green-400">
            {t("hero.title")}
          </h1>
          <p className="max-w-2xl text-white mb-8 text-lg">{t("hero.subtitle")}</p>
          <Link
            to="/login"
            className="text-white px-8 py-3 md:text-lg text-base rounded-xl font-semibold transition"
            style={{ background: theme.navbarlogo }}
          >
            {t("hero.cta")}
          </Link>
        </div>
      </section>

      {/* Developer Section */}
      <section className="px-6 py-24 flex justify-center items-center">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-center gap-12 md:gap-20">
          <div className="flex-shrink-0">
            <img
              src="/me.png"
              alt="Youssef Fissal"
              className="w-56 md:h-56 object-cover rounded-2xl shadow-lg"
            />
          </div>

          <div
            className={`flex-1 space-y-3 text-center md:text-left ${i18n.language === "ar" ? "md:text-right" : ""
              }`}
          >
            <span className="text-sm uppercase tracking-widest" style={{ color: theme.cardtext }}>
              {t("developer.role")}
            </span>
            <h2 className="text-2xl md:text-3xl font-bold" style={{ color: theme.cardtext }}>
              {t("developer.builtBy")}
            </h2>
            <h2 className="text-3xl md:text-5xl font-bold" style={{ color: theme.navbarlogo }}>
              {t("developer.name")}
            </h2>
            <p className="text-base md:text-lg max-w-xl" style={{ color: theme.cardtext }}>
              {t("developer.description")}
            </p>

            <div className="flex justify-center md:justify-start gap-6 text-2xl pt-2" style={{ color: theme.cardtext }}>
              <a href="https://github.com/yousseffissal" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition">
                <FaGithub />
              </a>
              <a href="https://www.linkedin.com/in/youssef-fissal" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition">
                <FaLinkedin />
              </a>
              <a href="https://www.instagram.com/fissal_youssef/" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition">
                <FaInstagram />
              </a>
              <a href="mailto:youssefpaxar1@gmail.com" className="hover:scale-110 transition">
                <MdEmail />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section
        className="relative flex justify-center items-center py-20"
        style={{
          background: `url("/bg3.jpg")`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute top-0 left-0 w-full h-full z-0 bg-black/55" />
        <div className="flex flex-col justify-center items-center z-20">
          <h2 className="md:text-3xl text-2xl font-bold mb-9 px-2 text-center text-green-400">
            {t("cta.title")}
          </h2>
          <Link
            to="/register"
            className="text-white px-10 py-4 rounded-xl font-semibold md:text-lg text-base transition"
            style={{ background: theme.navbarlogo }}
          >
            {t("cta.button")}
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="grid md:grid-cols-3 gap-8 px-8 py-20">
        <div className="border rounded-3xl p-8 shadow hover:shadow-lg transition">
          <h3 className="text-xl font-semibold mb-3" style={{ color: theme.navbarlogo }}>
            {t("features.taskTitle")}
          </h3>
          <p style={{ color: theme.cardtext }}>{t("features.taskDesc")}</p>
        </div>

        <div className="border rounded-3xl p-8 shadow hover:shadow-lg transition">
          <h3 className="text-xl font-semibold mb-3" style={{ color: theme.navbarlogo }}>
            {t("features.quranTitle")}
          </h3>
          <p style={{ color: theme.cardtext }}>{t("features.quranDesc")}</p>
        </div>

        <div className="border rounded-3xl p-8 shadow hover:shadow-lg transition">
          <h3 className="text-xl font-semibold mb-3" style={{ color: theme.navbarlogo }}>
            {t("features.motivationTitle")}
          </h3>
          <p style={{ color: theme.cardtext }}>{t("features.motivationDesc")}</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 text-sm bg-gray-900 text-white">
        © 2026 Muslim Planner - {t("footer.rights")}
      </footer>
    </div>
  );
}