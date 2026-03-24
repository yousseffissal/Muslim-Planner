import { useState, useEffect } from "react";
import SurahList from "../components/SurahList";
import SurahView from "../components/SurahView";
import background from "../assets/background5.jpg";
import { QuranHook } from '../hooks/QuranHook.js'
import { scrollToTop } from '../tools/ScrollTop'
import { AiOutlineLeft } from "react-icons/ai";
import { AiOutlineRight } from "react-icons/ai";
import { getProgress } from "../services/QuranService";
import { useTheme } from "../context/ThemeContext";
import { useReader } from "../context/ReaderContext";
import { useAuth } from "../context/AuthContext.jsx" 

function QuranPage() {

  const {
    loading,
    result,
    error,
    setResult,
    fetchQuranSurah
  } = QuranHook();

  const { selectedReader } = useReader();


  const [selectedSurah, setSelectedSurah] = useState(null);
  const [showList, setShowList] = useState(false);
  const [savedProgress, setSavedProgress] = useState(null);
  const { theme } = useTheme();

  const loadProgress = async () => {
    try {
      const progress = await getProgress();
      setSavedProgress(progress)
    } catch (err) {
      console.error("Failed to load progress", err);
    }
  };

  useEffect(() => {
    loadProgress();
  }, []);

  const handleSelect = (number) => {
    setSelectedSurah(number);
    setShowList(false);
    fetchQuranSurah(number, selectedReader?.identifier || "ar.alafasy").then(() => scrollToTop());
  };

  useEffect(() => {
    if (selectedSurah && selectedReader) {
      fetchQuranSurah(selectedSurah, selectedReader?.identifier || "ar.alafasy")
    }
  }, [selectedReader]);

  return (
    <div
      className="w-full md:p-4 p-2 bg-no-repeat bg-center bg-cover"
      style={{
        backgroundImage: result ? "none" : `url(${background})`,
        backgroundColor: result ? `${theme.quranpage}` : "transparent",
        minHeight: "100vh"
      }}
    >
      <div className="w-full mx-auto mb-2">

        <div className="flex justify-between gap-2">
          {selectedSurah && (
            <button
              onClick={() => {
                if (selectedSurah > 1) {
                  handleSelect(selectedSurah - 1);
                }
              }}
              className={`px-3 py-2 sm:px-6 sm:py-3 rounded-xl text-white transition ${selectedSurah === 1 ? "opacity-50 cursor-not-allowed" : ""
                }`}
              disabled={selectedSurah === 1}
              style={{ background: theme.navbarlogo }}
            >
              <AiOutlineLeft />
            </button>
          )}

          <button
            onClick={() => {
              loadProgress();
              setResult(null);
              setShowList(!showList);
              setSelectedSurah(null);
            }}
            className="px-3 py-2 sm:px-6 rounded-xl sm:py-3 text-lg transition flex-1"
            style={{ background: theme.card, color: theme.cardtext }}
          >
            {selectedSurah ? `Surah Number ${selectedSurah}` : "Select a Surah"}
          </button>

          {selectedSurah && (
            <button
              onClick={() => {
                if (selectedSurah < 114) {
                  handleSelect(selectedSurah + 1);
                }
              }}
              className={`px-3 py-2 sm:px-6 sm:py-3 rounded-xl  text-white transition ${selectedSurah === 114 ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={selectedSurah === 114}
              style={{ background: theme.navbarlogo }}
            >
              <AiOutlineRight />
            </button>
          )}
        </div>

        <div
          className={`transition-all duration-300 ease-out overflow-y-auto ${showList
            ? "opacity-100 scale-100 max-h-screen mt-2"
            : "opacity-0 scale-95 max-h-0"
            }`}
        >
          <div>
            <SurahList onSelect={handleSelect} />
          </div>
        </div>

      </div>

      {!showList && !selectedSurah && (
        <div className="w-full flex mt-6 justify-center px-4">

          <div
            className="max-w-2xl w-full rounded-2xl p-8 md:p-10 text-center shadow-xl transition-all duration-300 hover:shadow-2xl"
            style={{ background: theme.card }}
          >

            {/* Icon */}
            <div className="flex justify-center mb-5">
              <div
                className="w-14 h-14 flex items-center justify-center rounded-full text-xl shadow"
                style={{ background: theme.navbarlogo }}
              >
                📖
              </div>
            </div>

            {/* Title */}
            <h2
              className="text-2xl md:text-3xl font-bold mb-3"
              style={{ color: theme.navbarlogo }}
            >
              Welcome to the Holy Quran Section
            </h2>

            {/* Description */}
            <p
              className="text-base md:text-lg leading-relaxed opacity-90 mb-4"
              style={{ color: theme.cardtext }}
            >
              Select a Surah from the list to explore its verses and reflect on their meanings in a peaceful reading experience.
            </p>

            {/* API note */}
            <p
              className="text-sm opacity-70"
              style={{ color: theme.cardtext }}
            >
              This app uses{" "}
              <a
                href="https://alquran.cloud/api"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 font-medium"
                style={{ color: theme.navbarlogo }}
              >
                AlQuran.cloud API
              </a>{" "}
              to fetch Quran data.
            </p>

            {/* Divider */}
            <div
              className="my-6 h-px w-full opacity-20"
              style={{ background: theme.cardtext }}
            ></div>

            {/* Button */}
            {savedProgress && (
              <button
                onClick={() => {
                  handleSelect(savedProgress.surah);

                  setTimeout(() => {
                    const el = document.getElementById(`ayah-${savedProgress.ayah - 1}`);
                    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
                  }, 500);
                }}
                className="px-6 py-3 rounded-lg font-medium shadow-md md:text-base text-xs transition-all duration-300 hover:scale-[1.03] active:scale-95"
                style={{ background: theme.navbarlogo, color: "#fff" }}
              >
                📍 Continue Reading (Ayah {savedProgress.ayah} Surah {savedProgress.surah})
              </button>
            )}

          </div>

        </div>
      )}

      {selectedSurah && (
        <div className="w-full mx-auto md:p-6 p-4 md:rounded-[36px] rounded-[28px] shadow"
          style={{ background: theme.card }}>
          {loading && <p className="text-center" style={{ color: theme.cardtext }}>Loading...</p>}
          {error && <p className="text-center text-red-600">{error}</p>}
          {result && (
            <SurahView
              surahView={result}
              savedAyah={savedProgress ? savedProgress.ayah : null}
            />
          )}
        </div>
      )}

      {selectedSurah &&
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 w-12 h-12 text-white rounded-full shadow-lg  transition flex items-center justify-center"
          style={{ background: theme.navbarlogo }}
          title="Back to Top"
        >
          Top
        </button>
      }
    </div>
  );
}

export default QuranPage;
