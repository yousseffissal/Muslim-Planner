import { useState, useRef, useEffect } from "react";
import i18n from "i18next";
import { motion, AnimatePresence } from "framer-motion";

const languages = [
  { code: "en", label: "English", flag: "https://flagcdn.com/w40/gb.png" },
  { code: "fr", label: "Français", flag: "https://flagcdn.com/w40/fr.png" },
  { code: "ar", label: "العربية", flag: "https://flagcdn.com/w40/ma.png" },
];

export default function LanguageDropdown() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const currentLang =
    languages.find((l) => l.code === i18n.language) || languages[0];

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="w-6 h-6 navbar:w-10 navbar:h-10 rounded-full overflow-hidden shadow-sm hover:shadow-md transition duration-300 bg-white flex items-center justify-center"
      >
        <img
          src={currentLang.flag}
          alt={currentLang.label}
          className="w-full h-full object-cover rounded-full"
        />
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={`absolute overflow-hidden mt-4 rounded-xl shadow-lg bg-[#f9fafb] z-50
            right-0 w-36 sm:w-40`}
          >
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => changeLanguage(lang.code)}
                className="flex items-center gap-3 w-full px-3 sm:px-4 py-2 text-left text-gray-700 hover:bg-[#c8f0d7] transition"
              >
                <img
                  src={lang.flag}
                  alt={lang.label}
                  className="w-4 h-4 sm:w-5 sm:h-5 rounded-full"
                />
                {lang.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}