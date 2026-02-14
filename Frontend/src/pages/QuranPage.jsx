import { useState } from "react";
import SurahList from "../components/SurahList";
import SurahView from "../components/SurahView";
import background from "../assets/background4.jpg";
import { QuranHook } from '../hooks/QuranHook.js'
import { scrollToTop } from '../tools/ScrollTop'

function QuranPage() {

  const {
    loading,
    result,
    error,
    fetchQuranSurah
  } = QuranHook();

  const [selectedSurah, setSelectedSurah] = useState(null);
  const [showList, setShowList] = useState(true);

  const handleSelect = (number) => {
    setSelectedSurah(number);
    setShowList(false);
    fetchQuranSurah(number);
    scrollToTop();
  };

  return (
    <div
      className="w-full min-h-screen bg-green-100 bg-no-repeat bg-center bg-cover p-2"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="w-full mx-auto mb-2">
        <button
          onClick={() => {
            setShowList(!showList);
            setSelectedSurah(null);
          }}
          className="w-full p-4 bg-white rounded-xl text-green-900 text-lg hover:bg-green-200 transition"
        >
          {selectedSurah ? `سورة رقم ${selectedSurah}` : "اختر سورة"}
        </button>

        {showList && <SurahList onSelect={handleSelect} />}
      </div>

      {selectedSurah && (
        <div className="w-full mx-auto bg-white p-6 rounded-[36px] shadow">
          {loading && <p className="text-center text-green-900">جاري التحميل...</p>}
          {error && <p className="text-center text-red-600">{error}</p>}
          {result && <SurahView surahView={result} />}
        </div>
      )}

      {/* زر الرجوع للأعلى */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 w-12 h-12 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition flex items-center justify-center"
        title="الرجوع للأعلى"
      >
        Top
      </button>
    </div>
  );
}

export default QuranPage;
