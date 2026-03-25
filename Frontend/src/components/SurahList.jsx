import { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";

function SurahSelect({ onSelect }) {
  const [surahs, setSurahs] = useState([]);
  const { theme } = useTheme();

  useEffect(() => {
    fetch("https://api.alquran.cloud/v1/surah")
      .then(res => res.json())
      .then(data => setSurahs(data.data));
  }, []);

  return (
    <div className="overflow-y-auto flex flex-col justify-center p-1 w-full max-h-full">
      <div className="space-y-3 w-full mx-auto">
        {surahs.map((surah, index) => (
          <div
            key={surah.number}
            onClick={() => onSelect(surah.number)}
            className={`p-4 rounded-xl cursor-pointer transition hover:scale-[1.01]`}
            style={{
              backgroundColor: index % 2 === 0
                ? theme.surahlist1
                : theme.surahlist2
            }}
          >
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold"
                style={{ color: theme.surahlisttext }}>
                {surah.number} {". "} {surah.name} {"/"} {surah.englishName}
              </span>

              <span className="flex justify-center items-center gap-2" style={{ color: theme.surahlisttext }}>
                <img src={surah.revelationType==="Meccan"? "/mecca.png" : "/madina.png"} alt="Type" className="w-6 h-6"/>
              </span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

export default SurahSelect;