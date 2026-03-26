import { useTheme } from "../context/ThemeContext";

function ThemeToggle() {
  const { toggleTheme, mode } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="flex w-full justify-center items-center gap-2 px-4 py-2 rounded-xl shadow-md font-semibold"
      style={{
        background: mode === "light" ? "#111827" : "#f9fafb",
        color: mode === "light" ? "#f9fafb" : "#111827"
      }}
    >
      {mode === "light" ? "🌙" : "☀️"}
    </button>
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