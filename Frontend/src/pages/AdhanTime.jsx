import { useEffect } from 'react';
import { AdhanHook } from '../hooks/AdhanHook.js';
import background from '../assets/background3.jpg';
import { useTheme } from "../context/ThemeContext";
import { useTranslation } from "react-i18next";
import i18n from "i18next";

function AdhanTime() {
  const { t } = useTranslation("adhan"); // استخدام namespace adhan

  const {
    loading,
    city,
    setCity,
    result,
    date,
    setDate,
    error,
    successMsg,
    setError,
    setSuccessMsg,
    fetchAdhan
  } = AdhanHook();

  const { theme, mode } = useTheme();

  useEffect(() => {
    const timer = setTimeout(() => setError(""), 3000);
    return () => clearTimeout(timer);
  }, [error]);

  useEffect(() => {
    const timer = setTimeout(() => setSuccessMsg(""), 3000);
    return () => clearTimeout(timer);
  }, [successMsg]);

  return (
    <div
      dir={i18n.language === "ar" ? "rtl" : "ltr"}
      className="relative min-h-[calc(100vh-64px)] overflow-y-auto flex justify-center p-4 bg-no-repeat bg-center bg-cover overflow-hidden"
      style={{ backgroundImage: `url(${background})` }}>

      {/* Overlay */}
      <div
        className="absolute top-0 left-0 w-full h-full z-10"
        style={{
          background: mode !== "light" ? '#00000060' : "transparent",
        }}
      />

      <div className="flex items-start justify-center z-30">
        <div className="w-full max-w-xl rounded-2xl p-8 md:shadow-2xl"
          style={{ background: theme.card }}>

          <h1 className="text-3xl font-bold text-center mb-2"
            style={{ color: theme.AdhanRed }}>
            {t("adhan.title")}
          </h1>

          <p className="text-center mb-6" style={{ color: theme.cardtext }}>
            {t("adhan.subtitle")}
          </p>

          {/* City Input */}
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder={t("adhan.cityPlaceholder")}
            className="w-full mb-2 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-400 transition"
            style={{
              background: mode !== "light" ? "transparent" : "#eeeeee",
              color: mode !== "light" ? "#ffffff" : "#000000",
              border: `1px solid ${theme.AdhanRed}`,
            }}
            disabled={loading}
          />

          {/* Date Input */}
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full rounded-xl px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-red-400 transition"
            style={{
              background: mode !== "light" ? "transparent" : "#eeeeee",
              color: mode !== "light" ? "#ffffff" : "#000000",
              border: `1px solid ${theme.AdhanRed}`
            }}
            disabled={loading}
          />

          {/* Small note */}
          <p
            className="text-xs mb-4"
            style={{ color: theme.cardtext }}
            dangerouslySetInnerHTML={{
              __html: t("adhan.note", {
                themeColor: theme.AdhanRed
              })
            }}
          />

          {/* Button */}
          <button
            onClick={fetchAdhan}
            disabled={loading}
            className={`w-full rounded-xl py-3 font-semibold text-white transition-all duration-200 mb-6
              ${loading ? 'cursor-not-allowed' : 'active:scale-95'}`}
            style={{ background: loading ? "#9ca3af" : theme.AdhanRed }}
          >
            {loading ? t("adhan.loading") : t("adhan.getButton")}
          </button>

          {/* Results */}
          <div>
            {loading && (
              <div className="flex items-center justify-center py-8">
                <div className="h-8 w-8 animate-spin rounded-full"
                  style={{ border: `4px solid ${theme.AdhanRed}`, borderTopColor: "transparent" }}>
                </div>
              </div>
            )}

            {!loading && (
              <>
                {error && (
                  <p className="rounded-lg p-3 mb-4 text-center"
                    style={{
                      background: mode !== "light" ? "transparent" : "#fef2f2",
                      color: theme.AdhanRed,
                      border: `1px solid ${theme.AdhanRed}`
                    }}>
                    {error}
                  </p>
                )}

                {successMsg && (
                  <p className="rounded-lg p-3 mb-4 text-center"
                    style={{
                      background: mode !== "light" ? "transparent" : "#f0fdf4",
                      color: theme.navbarlogo,
                      border: `1px solid ${theme.navbarlogo}`
                    }}>
                    {successMsg}
                  </p>
                )}

                {result?.data && (
                  <div className="grid grid-cols-2 gap-4">
                    <PrayerCard name={t("adhan.prayers.fajr")} time={result.data.Fajr} />
                    <PrayerCard name={t("adhan.prayers.dhuhr")} time={result.data.Dhuhr} />
                    <PrayerCard name={t("adhan.prayers.asr")} time={result.data.Asr} />
                    <PrayerCard name={t("adhan.prayers.maghrib")} time={result.data.Maghrib} />
                    <PrayerCard name={t("adhan.prayers.isha")} time={result.data.Isha} />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function PrayerCard({ name, time }) {
  const { theme, mode } = useTheme();
  return (
    <div className="transition rounded-xl p-4 shadow-sm border text-center"
      style={{
        background: mode !== "light" ? "transparent" : "#f9fafb",
        border: `2px solid ${theme.AdhanRed}`
      }}>
      <p className="text-sm" style={{ color: theme.cardtext }}>{name}</p>
      <p className="text-lg font-bold mt-1" style={{ color: theme.AdhanRed }}>{time}</p>
    </div>
  );
}

export default AdhanTime;