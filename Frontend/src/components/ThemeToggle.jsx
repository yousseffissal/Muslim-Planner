import { useTheme } from "../context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion"; // لإضافة حركات لطيفة

function ThemeToggle() {
  const { toggleTheme, mode } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      whileTap={{ scale: 0.95 }} // تأثير الضغط
      className={`flex w-full justify-center items-center gap-2 px-4 py-2 rounded-xl shadow-md transition-colors duration-500`}
      style={{
        background: mode === "light" ? "#111827" : "#f9fafb",
        color: mode === "light" ? "#f9fafb" : "#111827",
      }}
    >
      <motion.span
        key={mode} // يتيح إعادة التحريك عند التبديل
        initial={{ rotate: 0, opacity: 0 }}
        animate={{ rotate: 360, opacity: 1 }}
        exit={{ rotate: -360, opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="text-base sm:text-lg" // حجم متناسب مع الزر
      >
        {mode === "light" ? "🌙" : "☀️"}
      </motion.span>
    </motion.button>
  );
}

export default ThemeToggle;

/*import { useTheme } from "../context/ThemeContext";

function ThemeToggle() {
  const { toggleTheme, mode } = useTheme(); // جلب theme الحالي أيضًا

  return (
    <button
      onClick={toggleTheme}
      className="flex w-full justify-center items-center gap-2 px-4 py-2 rounded-xl shadow-md font-semibold transition-colors duration-300"
      style={{
        background: mode === "light" ? "#111827" : mode === "dark" ? "#FFD700" : "#f9fafb"
      }}
    >
      {mode === "light" ? "🌙" : mode === "dark" ? "⭐" : "☀️"} 
    </button>
  );
}

export default ThemeToggle;*/