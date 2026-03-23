import { useReader } from "../context/ReaderContext";
import { useState } from "react";
import { arabicQuranReaders as readers } from "../tools/readers";
import { useTheme } from "../context/ThemeContext";

const QuranReaderSelector = () => {
  const { selectedReader, setSelectedReader } = useReader();
  const [isOpen, setIsOpen] = useState(false);
  const { theme } = useTheme();

  const handleSelect = (reader) => {
    setSelectedReader(reader);
    setIsOpen(false);
  };

  return (
    <div className="w-full md:w-1/2">
      {/* زر اختيار القارئ */}
      <button
        onClick={() => setIsOpen(true)}
        className="w-full justify-center text-white px-3 py-1.5 rounded-lg transition shadow-sm text-base flex items-center gap-1"
        style={{ background: theme.navbarlogo }}
      >
        {selectedReader ? selectedReader.englishName : "Select Reader"}
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 p-4">

          {/* الصندوق */}
          <div
            className="w-full max-w-2xl md:max-w-4xl rounded-2xl shadow-2xl overflow-hidden animate-fadeIn"
            style={{ background: theme.card }}
          >
            {/* رأس الـ Modal */}
            <div className="flex justify-start items-center px-4 md:px-6 py-3 border-b">
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-red-500 text-xl"
              >
                ✕
              </button>
            </div>

            {/* المحتوى */}
            <div className="p-4 md:p-6 max-h-[65vh] overflow-y-auto">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-5">
                {readers.map((reader) => {
                  const isSelected = selectedReader?.identifier === reader.identifier;
                  return (
                    <div
                      key={reader.identifier}
                      onClick={() => handleSelect(reader)}
                      className={`rounded-xl p-3 flex flex-col items-center cursor-pointer transition-all hover:scale-105 hover:shadow-md ${
                        isSelected ? "scale-105 shadow-lgl" : ""
                      }`}
                      style={{
                        background: theme.card,
                        border: `${isSelected ? "3px" : "2px"} solid ${isSelected ? "#eeb703"  : theme.navbarlogo}`,
                        color: theme.cardtext,
                      }}
                    >
                      {/* صورة القارئ */}
                      <img
                        src={
                          reader.url
                            ? reader.url
                            : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                reader.englishName.charAt(0)
                              )}&background=${theme.navbarlogo.replace("#", "")}&color=fff`
                        }
                        alt={reader.name}
                        className="w-16 h-16 md:w-20 md:h-20 rounded-full mb-2 object-cover"
                        style={{ border: `0px solid ${theme.navbarlogo}` }}
                        onError={(e) => {
                          e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                            reader.englishName.charAt(0)
                          )}&background=${theme.navbarlogo.replace("#", "")}&color=fff`;
                        }}
                      />
                      {/* اسم القارئ */}
                      <h3 className="text-sm md:text-base text-center font-semibold leading-tight">
                        {reader.name}
                      </h3>
                      <p className="text-xs md:text-sm text-center">{reader.englishName}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuranReaderSelector;