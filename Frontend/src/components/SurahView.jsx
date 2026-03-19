import { useEffect, useRef, useState } from "react";
import { FaStepBackward, FaStepForward, FaPlay, FaPause, FaStar } from "react-icons/fa";
import { TbReload } from "react-icons/tb";
import bismilah from "../assets/bismilah.png";
import { saveProgress, getProgress } from "../services/QuranService";
import Swal from "sweetalert2";
import successIcon from "../assets/success.png"; // استيراد الصورة

function SurahView({ surahView }) {
  const [surah, setSurah] = useState();
  const [currentAyahIndex, setCurrentAyahIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [savedAyah, setSavedAyah] = useState(null);
  const audioRef = useRef(null);

  // تشغيل وإيقاف الصوت
  const togglePlay = () => {
    if (!audioRef.current) return;
    if (audioRef.current.paused) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  // تحميل السورة عند تغيير prop
  useEffect(() => {
    if (!surahView) return;
    setSurah(surahView.data);
    setCurrentAyahIndex(0);
    setIsPlaying(false);
  }, [surahView]);

  // تشغيل الآية الحالية عند التغيير
  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.load();
    if (isPlaying) audioRef.current.play().catch(() => { });
  }, [currentAyahIndex, isPlaying]);

  // تحميل آخر تقدم وحفظه
  useEffect(() => {
    const loadProgress = async () => {
      if (!surah) return;
      try {
        const progress = await getProgress();
        if (progress?.surah === surah.number) {
          setSavedAyah(progress.ayah);
          setCurrentAyahIndex(progress.ayah - 1);
          const el = document.getElementById(`ayah-${progress.ayah - 1}`);
          if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      } catch (err) {
        console.error("Failed to load progress", err);
      }
    };
    loadProgress();
  }, [surah]);

  if (!surah) return null;

  const handleEnded = () => {
    if (currentAyahIndex < surah.ayahs.length - 1) setCurrentAyahIndex(prev => prev + 1);
    else {
      setCurrentAyahIndex(0);
      setIsPlaying(false);
      if (audioRef.current) audioRef.current.pause();
    }
  };

  const goBack = () => { if (currentAyahIndex > 0) setCurrentAyahIndex(prev => prev - 1); setIsPlaying(true); };
  const goNext = () => { if (currentAyahIndex < surah.ayahs.length - 1) setCurrentAyahIndex(prev => prev + 1); setIsPlaying(true); };
  const showBismillah = surah.number !== 9;

  return (
    <div className="w-full text-right font-serif" style={{ direction: "rtl", fontFamily: "'Scheherazade New', serif" }}>
      <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl text-center text-green-800 font-bold mb-6 p-4 rounded-xl border border-green-800">
        {surah.name} - {surah.englishName}
      </h1>

      {showBismillah && (
        <p className="text-lg sm:text-xl md:text-3xl lg:text-4xl text-center text-green-700 font-bold my-6">
          <img src={bismilah} alt="بسم الله الرحمن الرحيم" className="inline-block h-16 md:h-20 lg:h-28 object-contain" />
        </p>
      )}

      {/* مشغل الصوت */}
      <div className="flex justify-center items-center mb-8">
        <div className="flex flex-col justify-center items-center bg-white border-2 border-green-600 shadow-lg rounded-2xl p-6 w-full max-w-xl">
          <h2 className="text-green-700 font-bold text-lg mb-4 text-center">
            {!isPlaying ? "🎧 تشغيل السورة" : "🎧 إيقاف السورة"}
          </h2>

          <audio ref={audioRef} onEnded={handleEnded} className="w-full rounded-lg accent-green-600">
            <source src={surah.ayahs[currentAyahIndex].audio} type="audio/mpeg" />
          </audio>

          <div className="flex justify-center items-center gap-4 mt-4">
            <button onClick={goBack} className="bg-green-600 hover:bg-green-700 text-white p-3 rounded-full shadow-lg transition duration-300">
              <FaStepForward size={20} />
            </button>

            <button onClick={togglePlay} className="bg-green-600 hover:bg-green-700 text-white p-3 rounded-full shadow-lg transition duration-300">
              {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
            </button>

            <button onClick={() => { setCurrentAyahIndex(0); setIsPlaying(true); }} className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition duration-300">
              <TbReload size={20} />
            </button>

            <button onClick={goNext} className="bg-green-600 hover:bg-green-700 text-white p-3 rounded-full shadow-lg transition duration-300">
              <FaStepBackward size={20} />
            </button>
          </div>

          <div className="mt-4 text-sm text-green-700 text-center cursor-pointer flex justify-center items-center gap-1 border border-green-400 rounded-md px-2 py-1 hover:bg-green-50 transition w-fit"
            onClick={() => {
              const el = document.getElementById(`ayah-${currentAyahIndex}`);
              if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
            }}
          >
            📍 اضغط للذهاب إلى الآية {currentAyahIndex + 1} من {surah.ayahs.length}
          </div>
        </div>
      </div>

      {/* عرض الآيات */}
      <p className="text-base sm:text-lg md:text-3xl lg:text-3xl leading-[1.8] sm:leading-[2.2] md:leading-loose lg:leading-loose md:px-5 px-3" style={{ textAlign: "justify", direction: "rtl" }}>
        {surah.ayahs.map((ayah, index) => {
          let text = ayah.text;
          if (index === 0 && text.startsWith("بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ"))
            text = text.replace("بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ", "").trim();

          return (
            <span key={ayah.number}>
              <span
                id={`ayah-${index}`}
                onClick={() => { setCurrentAyahIndex(index); setIsPlaying(true); document.getElementById(`ayah-${index}`)?.scrollIntoView({ behavior: "smooth", block: "center" }); }}
                className={isPlaying ? index === currentAyahIndex ? "bg-green-100 text-green-800 px-2 rounded-lg transition-all duration-300 cursor-pointer" : "opacity-40 transition-all duration-300 cursor-pointer" : "cursor-pointer"}
              >
                {text}
              </span>

              <span
                onClick={async () => {
                  try {
                    // تعيين الآية الحالية وإيقاف التشغيل
                    setCurrentAyahIndex(index);
                    setIsPlaying(false);

                    // حفظ التقدم في السيرفر أو التخزين المحلي
                    await saveProgress(surah.number, ayah.numberInSurah);

                    // عرض رسالة نجاح باستخدام SweetAlert2
                    await Swal.fire({
                      title: "Progress Saved",
                      text: "Your progress was saved successfully!",
                      imageUrl: successIcon,
                      imageWidth: 80,   // العرض
                      imageHeight: 80,  // الارتفاع
                      imageAlt: "Custom icon",
                      confirmButtonText: "OK",
                      customClass: {
                        popup: "swal-popup-green",
                        title: "swal-title-green",
                        content: "swal-content-green",
                        confirmButton: "swal-btn-green",
                      },
                      buttonsStyling: false, // لتعطيل النمط الافتراضي للسويال
                    });

                    // تحديث الحالة المحلية للآية المحفوظة
                    setSavedAyah(ayah.numberInSurah);

                    // تمرير الشاشة إلى الآية المختارة بسلاسة
                    document.getElementById(`ayah-${index}`)?.scrollIntoView({
                      behavior: "smooth",
                      block: "center"
                    });

                  } catch (error) {
                    console.error("Failed to save progress", error);
                    // رسالة خطأ عند الفشل
                    Swal.fire({
                      text: "Failed to save progress",
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
                }}
                className={`mr-2 inline-flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 cursor-pointer font-semibold rounded-full transition-all duration-300 ease-in-out
                  ${savedAyah === ayah.numberInSurah ? "bg-orange-600 text-white scale-110 shadow-lg animate-pulse" : "bg-green-200 text-green-800 hover:bg-green-600 hover:text-white hover:scale-110"}
                  ${isPlaying ? index === currentAyahIndex ? "" : "opacity-40" : ""}
                `}
              >
                {savedAyah === ayah.numberInSurah ? <FaStar className="w-4 h-4 sm:w-5 sm:h-5 md:w-5 md:h-5" /> : ayah.numberInSurah}
              </span>{" "}
            </span>
          );
        })}
      </p>

      <p className="text-lg sm:text-xl md:text-3xl lg:text-4xl text-center text-green-700 font-bold my-6">
        صدق الله العظيم
      </p>
    </div>
  );
}

export default SurahView;