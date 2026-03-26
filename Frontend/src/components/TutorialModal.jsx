import { useState } from "react";
import { useTheme } from "../context/ThemeContext";

const tutorialData = [
    {
        title: "📖 Continue Your Reading",
        text: "Resume your reading from where you left off, or choose any Surah from the Surah list.",
        image: "/T1.png",
    },
    {
        title: "💾 Save Your Progress",
        text: "Click on an Ayah number to save your progress and return to it later anytime.",
        image: "/T2.png",
    },
    {
        title: "🎧 Play & Control Audio",
        text: "Click on any Ayah to start its audio. Use the control panel to play, pause, and navigate between Ayahs.",
        image: "/T3.png",
    },
    {
        title: "🎙️ Choose Your Reciter",
        text: "Open the reciters list and select your favorite reciter from a wide collection.",
        image: "/T4.png",
    },
];

export default function TutorialModal({ onClose }) {
    const [step, setStep] = useState(0);
    const isLast = step === tutorialData.length - 1;
    const { theme } = useTheme();

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/55 p-4">

            {/* Modal */}
            <div
                className="relative w-full max-w-4xl rounded-3xl shadow-2xl p-6 md:p-10 transition-all duration-300 animate-fadeIn"
                style={{
                    background: theme.popups,
                    color: theme.cardtext,
                }}
            >

                {/* Close */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-6 text-xl transition text-gray-500 hover:text-red-500"
                >
                    ✕
                </button>

                {/* Content */}
                <div className="flex flex-col md:flex-row items-center gap-8">

                    {/* Image */}
                    <div className="w-full md:w-1/2 flex justify-center">
                        <img
                            src={tutorialData[step].image}
                            alt=""
                            className="w-full max-w-xs md:max-w-sm object-contain rounded-xltransition duration-500"
                            style={{
                            }}
                        />
                    </div>

                    {/* Text */}
                    <div className="w-full md:w-1/2 text-center md:text-left ">
                        <h2
                            className="text-2xl md:text-3xl font-bold mb-4"
                            style={{ color: theme.navbarlogo }}
                        >
                            {tutorialData[step].title}
                        </h2>

                        <p
                            className="text-lg leading-relaxed"
                            style={{ color: theme.cardtext }}
                        >
                            {tutorialData[step].text}
                        </p>
                    </div>

                </div>

                {/* Indicators */}
                <div className="flex justify-center gap-2 mt-6">
                    {tutorialData.map((_, i) => (
                        <span
                            key={i}
                            className="h-2 w-2 rounded-full transition-all duration-300 cursor-pointer"
                            style={{
                                background: i === step ? theme.navbarlogo : theme.cardtext,
                                opacity: i === step ? 1 : 0.3,
                                transform: i === step ? "scale(1.3)" : "scale(1)",
                            }}
                            onClick={() => setStep(i)}
                        />
                    ))}
                </div>

                {/* Buttons */}
                <div className="flex justify-between items-center mt-6">

                    {/* Previous */}
                    <button
                        onClick={() => setStep(step - 1)}
                        disabled={step === 0}
                        className="px-4 py-2 rounded-xl transition"
                        style={{
                            background: step === 0 ? "transparent" : theme.AdhanRed,
                            color: step === 0 ? "#666" : "#fff",
                            cursor: step === 0 ? "not-allowed" : "pointer",
                        }}
                    >
                        ← Previous
                    </button>

                    {/* Next / Finish */}
                    {!isLast ? (
                        <button
                            onClick={() => setStep(step + 1)}
                            className="px-6 py-2 rounded-xl font-semibold shadow-md transition"
                            style={{
                                background: theme.navbarlogo,
                                color: "#fff",
                            }}
                        >
                            Next →
                        </button>
                    ) : (
                        <button
                            onClick={onClose}
                            className="px-6 py-2 rounded-xl font-semibold shadow-md transition"
                            style={{
                                background: theme.navbarlogo,
                                color: "#fff",
                            }}
                        >
                            Get Started 🚀
                        </button>
                    )}

                </div>

            </div>
        </div>
    );
}