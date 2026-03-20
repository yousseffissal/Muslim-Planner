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
      {mode === "light" ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}

export default ThemeToggle;