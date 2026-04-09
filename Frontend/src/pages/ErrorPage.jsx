import { useRouteError, isRouteErrorResponse } from "react-router-dom";
import errorImage from "../assets/error404.jpg";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { useTranslation } from "react-i18next";

function ErrorPage() {
    const error = useRouteError();
    const { isAuthenticated } = useAuth();
    const { theme } = useTheme();
    const { t, i18n } = useTranslation("error");

    let title = t("error.wrong");
    let message = t("error.unexpectedError");

    if (isRouteErrorResponse(error)) {
        title = `${error.status} ${error.statusText}`;

        if (error.status === 404) {
            message = t("error.notFoundMessage");
            title = t("error.wrong");
        }
    }

    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen"
            dir={i18n.language === "ar" ? "rtl" : "ltr"}
            style={{ background: theme.quranpage }}>
            {/* Wrapper */}
            <div className="flex flex-col text-center px-6 w-fit h-fit justify-center items-center"
                style={{
                    background: theme.quranpage,
                    color: theme.cardtext
                }}>

                {/* Error Illustration */}
                <img
                    src={errorImage}
                    alt="404 Error"
                    className="w-full max-w-lg mx-auto object-contain mb-4 rounded-2xl shadow-lg"
                />

                {/* Error Title */}
                <h1 className="text-4xl font-bold mb-4"
                    style={{ color: theme.navbarlogo }}>
                    {title}
                </h1>

                {/* Error Message */}
                <p className="mb-10 text-lg opacity-90 max-w-lg">
                    {message}
                </p>

                {/* Back Home Button */}
                <a
                    href={isAuthenticated ? "/app/dashboard" : "/"}
                    className="inline-block text-white rounded-full px-6 py-2 text-sm font-medium transition-all duration-300 ease-in-out"
                    style={{
                        background: theme.navbarlogo,
                        border: `1px solid ${theme.navbarlogo}`
                    }}
                >
                    {t("error.backHome")}
                </a>

            </div>
        </div>
    );
}

export default ErrorPage;
