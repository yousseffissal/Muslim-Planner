import { useAuth } from "../context/AuthContext.jsx";
import { useTheme } from "../context/ThemeContext.jsx";
import { useTranslation } from "react-i18next";
import { FaUser, FaEnvelope, FaVenusMars, FaSignOutAlt } from "react-icons/fa";

export default function UserProfile() {
  const { user, logout } = useAuth();
  const { theme } = useTheme();
  const { t, i18n } = useTranslation("auth");

  if (!user) {
    return (
      <div
        className="p-6 rounded-xl text-center"
        style={{ background: theme.card, color: theme.cardtext }}
      >
        <p>{t("auth.profile.loading") || "Loading..."}</p>
      </div>
    );
  }

  return (
    <div
      dir={i18n.language === "ar" ? "rtl" : "ltr"}
      className="p-6 rounded-xl shadow-lg max-w-md mx-auto"
      style={{ background: theme.card, color: theme.cardtext }}
    >
      {/* Avatar */}
      <div className="flex justify-center mb-6">
        {user.avatar ? (
          <img
            src={user.avatar}
            alt={user.username}
            className="w-24 h-24 rounded-full object-cover border-4"
            style={{ borderColor: theme.navbarlogo }}
          />
        ) : (
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center text-4xl border-4"
            style={{
              borderColor: theme.navbarlogo,
              background: theme.navbarlogo + "20",
              color: theme.navbarlogo,
            }}
          >
            <FaUser />
          </div>
        )}
      </div>

      {/* Username */}
      <h2
        className="text-2xl font-bold text-center mb-4"
        style={{ color: theme.navbarlogo }}
      >
        {user.username} {user.famillyname}
      </h2>

      {/* User Info */}
      <div className="space-y-3">
        <div
          className="flex items-center gap-3 p-3 rounded-lg"
          style={{ background: theme.quranpage }}
        >
          <FaEnvelope style={{ color: theme.navbarlogo }} />
          <span>{user.email}</span>
        </div>

        <div
          className="flex items-center gap-3 p-3 rounded-lg"
          style={{ background: theme.quranpage }}
        >
          <FaVenusMars style={{ color: theme.navbarlogo }} />
          <span>
            {user.gender === "male"
              ? t("auth.profile.male") || "Male"
              : user.gender === "female"
              ? t("auth.profile.female") || "Female"
              : user.gender}
          </span>
        </div>

        {user.quranProgress && (
          <div
            className="flex items-center gap-3 p-3 rounded-lg"
            style={{ background: theme.quranpage }}
          >
            <span style={{ color: theme.navbarlogo }} className="font-bold">
              📖
            </span>
            <span>
              {t("auth.profile.quranProgress") || "Quran Progress"}: Surah {user.quranProgress.surah}, Ayah {user.quranProgress.ayah}
            </span>
          </div>
        )}
      </div>

      {/* Logout Button */}
      <button
        onClick={logout}
        className="w-full mt-6 py-3 rounded-lg font-semibold text-white flex items-center justify-center gap-2 transition-opacity hover:opacity-90"
        style={{ background: theme.navbarlogo }}
      >
        <FaSignOutAlt />
        {t("auth.profile.logout") || "Logout"}
      </button>
    </div>
  );
}
