import { useState, useRef, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import { FaVolumeUp, FaVolumeMute, FaSun, FaMoon } from "react-icons/fa";
import { useTranslation } from "react-i18next";

export default function TasbeehCounter() {
  const { theme, mode, toggleTheme } = useTheme();
  const { t, i18n } = useTranslation("tasbeeh");
  const [count, setCount] = useState(0);
  const [tasbeehCycles, setTasbeehCycles] = useState(0);
  const [isPressed, setIsPressed] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [ripples, setRipples] = useState([]);
  const audioRef = useRef(null);
  const buttonRef = useRef(null);

  // Generate subtle click sound using Web Audio API
  const playClickSound = () => {
    if (!soundEnabled) return;

    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.value = 800;
      oscillator.type = "sine";

      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.1);
    } catch (e) {
      console.log("Audio not supported");
    }
  };

  // Generate completion sound
  const playCompleteSound = () => {
    if (!soundEnabled) return;

    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.value = 523.25; // C5
      oscillator.type = "sine";

      gainNode.gain.setValueAtTime(0.15, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.3);

      // Play harmony
      setTimeout(() => {
        const osc2 = audioContext.createOscillator();
        const gain2 = audioContext.createGain();
        osc2.connect(gain2);
        gain2.connect(audioContext.destination);
        osc2.frequency.value = 659.25; // E5
        gain2.gain.setValueAtTime(0.1, audioContext.currentTime);
        gain2.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
        osc2.start();
        osc2.stop(audioContext.currentTime + 0.3);
      }, 50);
    } catch (e) {
      console.log("Audio not supported");
    }
  };

  const handleCount = () => {
    playClickSound();
    setIsPressed(true);
    setTimeout(() => setIsPressed(false), 150);

    // Add ripple effect
    const newRipple = {
      id: Date.now(),
      x: Math.random() * 60 - 30,
      y: Math.random() * 60 - 30,
    };
    setRipples((prev) => [...prev, newRipple]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 600);

    if (count >= 99) {
      setCount(0);
      setTasbeehCycles((prev) => prev + 1);
      setTimeout(playCompleteSound, 150);
    } else {
      setCount((prev) => prev + 1);
    }
  };

  const handleReset = () => {
    setCount(0);
    setTasbeehCycles(0);
  };

  // Keyboard support
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.code === "Space" || e.code === "Enter") {
        e.preventDefault();
        handleCount();
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [count, soundEnabled]);

  const isDark = mode === "dark";
  const bgColor = isDark ? "#0d0d0d" : "#f5f5f5";
  const cardBg = theme.card || (isDark ? "#1a1a1a" : "#ffffff");
  const accentColor = theme.navbarlogo || "#16A34A";
  const textColor = theme.cardtext || (isDark ? "#ffffff" : "#374151");

  return (
    <div
      dir={i18n.language === "ar" ? "rtl" : "ltr"}
      className="min-h-screen flex items-start justify-center p-4 transition-colors duration-300"
      style={{ background: bgColor }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Footer hint */}
        <p
          className="text-center mb-4 text-sm opacity-50"
          style={{ color: textColor }}
        >
          {t("tasbeeh.pressHint")}
        </p>
        {/* Main Card */}
        <div
          className="rounded-3xl shadow-2xl overflow-hidden"
          style={{ background: cardBg }}
        >
          {/* Header */}
          <div className="p-6 pb-4">
            <div className="flex justify-between items-center mb-2">
              <h1
                className="text-2xl font-bold"
                style={{ color: accentColor }}
              >
                {t("tasbeeh.title")}
              </h1>
              <div className="flex gap-2">
                {/* Sound Toggle */}
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className="p-2 rounded-full transition-colors"
                  style={{
                    background: soundEnabled ? accentColor + "20" : "transparent",
                    color: soundEnabled ? accentColor : textColor,
                  }}
                  title={soundEnabled ? t("tasbeeh.muteSound") : t("tasbeeh.enableSound")}
                >
                  {soundEnabled ? <FaVolumeUp size={20} /> : <FaVolumeMute size={20} />}
                </motion.button>
              </div>
            </div>

            {/* Cycle Counter */}
            <div
              className="text-center py-3 rounded-xl mb-4"
              style={{ background: theme.quranpage || (isDark ? "#1a1a1a" : "#e6f9e6") }}
            >
              <p className="text-sm opacity-70" style={{ color: textColor }}>
                {t("tasbeeh.completedCycles")}
              </p>
              <AnimatePresence mode="wait">
                <motion.p
                  key={tasbeehCycles}
                  initial={{ scale: 1.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="text-4xl font-bold"
                  style={{ color: accentColor }}
                >
                  {tasbeehCycles}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>

          {/* Counter Display */}
          <div className="px-6 pb-4">
            <div
              className="text-center py-8 rounded-2xl"
              style={{
                background: `linear-gradient(135deg, ${accentColor}15, ${accentColor}05)`,
              }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={count}
                  initial={{ scale: 1.3, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <span
                    className="text-7xl font-bold"
                    style={{ color: accentColor }}
                  >
                    {count}
                  </span>
                </motion.div>
              </AnimatePresence>
              <p className="text-sm mt-2 opacity-60" style={{ color: textColor }}>
                / 100
              </p>
            </div>
          </div>

          {/* Main Button */}
          <div className="px-6 pb-8">
            <div className="flex justify-center">
              <motion.button
                ref={buttonRef}
                onClick={handleCount}
                whileTap={{ scale: 0.92 }}
                className="relative w-48 h-48 rounded-full shadow-xl overflow-hidden"
                style={{
                  background: `radial-gradient(circle at 30% 30%, ${accentColor}, ${accentColor}cc)`,
                  boxShadow: isPressed
                    ? `0 0 60px ${accentColor}80, 0 10px 30px ${accentColor}40`
                    : `0 10px 40px ${accentColor}40, 0 5px 15px ${accentColor}20`,
                }}
              >
                {/* Ripple effects */}
                <AnimatePresence>
                  {ripples.map((ripple) => (
                    <motion.div
                      key={ripple.id}
                      initial={{ scale: 0, opacity: 0.8 }}
                      animate={{ scale: 2.5, opacity: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.6 }}
                      className="absolute inset-0 rounded-full bg-white"
                      style={{
                        left: `calc(50% + ${ripple.x}px)`,
                        top: `calc(50% + ${ripple.y}px)`,
                        transform: "translate(-50%, -50%)",
                      }}
                    />
                  ))}
                </AnimatePresence>

                {/* Inner glow ring */}
                <div
                  className="absolute inset-4 rounded-full border-4 opacity-30"
                  style={{ borderColor: "rgba(255,255,255,0.5)" }}
                />

                {/* Center content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  {/* Bead pattern */}
                  <div className="relative">
                    <div
                      className="w-32 h-32 rounded-full border-4 opacity-20"
                      style={{ borderColor: "rgba(255,255,255,0.3)" }}
                    />
                    <div
                      className="absolute inset-8 rounded-full border-2 opacity-20"
                      style={{ borderColor: "rgba(255,255,255,0.3)" }}
                    />
                    <div
                      className="absolute inset-16 rounded-full border opacity-20"
                      style={{ borderColor: "rgba(255,255,255,0.3)" }}
                    />
                  </div>

                  <motion.span
                    animate={{
                      scale: isPressed ? 0.95 : 1,
                    }}
                    className="absolute text-white text-2xl font-bold drop-shadow-lg"
                  >
                    {count === 100 ? "✓" : count === 99 ? "🕌" : count <= 33 ? "سبحان الله" : count <= 66 && count > 33 ? "الحمد لله" : "الله أكبر"}
                  </motion.span>
                </div>

                {/* Highlight overlay */}
                <div
                  className="absolute top-4 left-4 w-20 h-20 rounded-full opacity-30"
                  style={{
                    background: "radial-gradient(circle, rgba(255,255,255,0.8), transparent)",
                  }}
                />
              </motion.button>
            </div>

            {/* Progress Ring */}
            <div className="mt-8">
              <div className="relative h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${count}%` }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="absolute inset-y-0 left-0 rounded-full"
                  style={{
                    background: `linear-gradient(90deg, ${accentColor}, ${accentColor}cc)`,
                  }}
                />
              </div>
              <p className="text-center mt-2 text-sm" style={{ color: textColor }}>
                {count}% {t("tasbeeh.complete")}
              </p>
            </div>
          </div>

          {/* Reset Button */}
          <div className="px-6 pb-6">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleReset}
              className="w-full py-3 rounded-xl font-semibold transition-colors"
              style={{
                background: theme.tablebuttonmenu || (isDark ? "#2a2a2b" : "#f7faf7"),
                color: textColor,
              }}
            >
              {t("tasbeeh.resetAll")}
            </motion.button>
          </div>
        </div>

        {/* RTL support wrapper */}
      </motion.div>
    </div>
  );
}
