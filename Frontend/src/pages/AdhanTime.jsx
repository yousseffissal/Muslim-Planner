import { useEffect } from 'react';
import { AdhanHook } from '../hooks/AdhanHook.js'
import background from '../assets/background3.jpg'
import { useTheme } from "../context/ThemeContext";

function AdhanTime() {

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

   useEffect(() => {
    const timer = setTimeout(() => setError(""), 3000);
    return () => clearTimeout(timer);
  }, [error]);

  useEffect(() => {
    const timer = setTimeout(() => setSuccessMsg(""), 3000);
    return () => clearTimeout(timer);
  }, [successMsg]);

  const { theme, mode } = useTheme();

  return (
    <div className="min-h-[calc(100vh-64px)] overflow-y-auto flex justify-center p-4 bg-no-repeat bg-center bg-cover"
      style={{ backgroundImage: `url(${background})` }}>
      <div className="flex items-start justify-center">

        <div className="w-full max-w-xl rounded-2xl p-8 md:shadow-2xl"
          style={{ background: theme.card }}>

          <h1 className="text-3xl font-bold text-center mb-2"
            style={{ color: theme.AdhanRed }}>
            🕌 Adhan Times
          </h1>

          <p className="text-center mb-6"
            style={{ color: theme.cardtext }}>
            Enter a city name to get today's or any day prayer times
          </p>

          {/* City Input */}
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="City name..."
            className="w-full mb-2 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-400 transition"
            style={{ background: mode === "dark" ? "transparent" : "#eeeeee", color: mode === "dark" ? "#ffffff" : "#000000", border: `1px solid ${theme.AdhanRed}`, }}
            disabled={loading}
          />

          {/* Date Input */}
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full rounded-xl  px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-red-400 transition"
            style={{
              background: mode === "dark" ? "transparent" : "#eeeeee",
              color: mode === "dark" ? "#ffffff" : "#000000",
              border: `1px solid ${theme.AdhanRed}`
            }}
            disabled={loading}
          />

          {/* Small note for the user */}
          <p className="text-xs mb-4"
            style={{ color: theme.cardtext }}>
            You can type city names in English or Arabic. <br />
            ⚠️ Note: If the city name is incorrect, the app may return random or approximate prayer times
            because the API tries to find the closest match based on available locations. <br />
            ℹ️ This app uses <a href="https://aladhan.com" className="underline " style={{ color: theme.AdhanRed }}>AlAdhan.com API</a> for prayer times. <br />
            🛠 I will add a solution to validate city names properly in the future.
          </p>

          {/* Button */}
          <button
            onClick={fetchAdhan}
            disabled={loading}
            className={`w-full rounded-xl py-3 font-semibold text-white transition-all duration-200 mb-6
        ${loading
                ? 'cursor-not-allowed'
                : 'active:scale-95'}`}
            style={{ background: loading ? "#9ca3af" : theme.AdhanRed }}
          >
            {loading ? 'Loading...' : 'Get Adhan Time'}
          </button>

          {/* Results Area */}
          <div>

            {/* Loader */}
            {loading && (
              <div className="flex items-center justify-center py-8">
                <div className="h-8 w-8 animate-spin rounded-full"
                  style={{ border: `4px solid ${theme.AdhanRed}`, borderTopColor: "transparent" }}></div>
              </div>
            )}

            {!loading && (
              <>
                {error && (
                  <p className="rounded-lg p-3 mb-4 text-center"
                    style={{ background: mode === "dark" ? "transparent" : "#fef2f2", color: theme.AdhanRed, border: `1px solid ${theme.AdhanRed}` }}>
                    {error}
                  </p>
                )}

                {successMsg && (
                  <p className="rounded-lg p-3 mb-4 text-center"
                    style={{ background: mode === "dark" ? "transparent" : "#f0fdf4", color: theme.navbarlogo, border: `1px solid ${theme.navbarlogo}` }}>
                    {successMsg}
                  </p>
                )}

                {result?.data && (
                  <div className="grid grid-cols-2 gap-4">

                    <PrayerCard name="Fajr" time={result.data.Fajr} />
                    <PrayerCard name="Dhuhr" time={result.data.Dhuhr} />
                    <PrayerCard name="Asr" time={result.data.Asr} />
                    <PrayerCard name="Maghrib" time={result.data.Maghrib} />
                    <PrayerCard name="Isha" time={result.data.Isha} />

                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>

  )
}

function PrayerCard({ name, time }) {
  const { theme, mode } = useTheme();
  return (
    <div className="transition rounded-xl p-4 shadow-sm border text-center"
      style={{
        background: mode === "dark" ? "transparent" : "#f9fafb",
        border: `2px solid ${theme.AdhanRed}`
      }}>
      <p className="text-sm" 
      style={{ color: theme.cardtext }}>{name}</p>
      <p className="text-lg font-bold mt-1"
       style={{ color: theme.AdhanRed }}>{time}</p>
    </div>
  );
}

export default AdhanTime
