import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import enLanding from "./Locales/en/landing.json";
import arLanding from "./Locales/ar/landing.json";
import frLanding from "./Locales/fr/landing.json";

import enWelcome from "./Locales/en/welcome.json";
import arWelcome from "./Locales/ar/welcome.json";
import frWelcome from "./Locales/fr/welcome.json";

import enAuth from "./Locales/en/auth.json";
import arAuth from "./Locales/ar/auth.json";
import frAuth from "./Locales/fr/auth.json";


import enAdhan from "./Locales/en/adhan.json";
import arAdhan from "./Locales/ar/adhan.json";
import frAdhan from "./Locales/fr/adhan.json";


import enLinks from "./Locales/en/links.json";
import arLinks from "./Locales/ar/links.json";
import frLinks from "./Locales/fr/links.json";

import enFooter from "./Locales/en/footer.json";
import arFooter from "./Locales/ar/footer.json";
import frFooter from "./Locales/fr/footer.json";


import enTutorial from "./Locales/en/tutorial.json";
import arTutorial from "./Locales/ar/tutorial.json";
import frTutorial from "./Locales/fr/tutorial.json";

import enError from "./Locales/en/error.json";
import arError from "./Locales/ar/error.json";
import frError from "./Locales/fr/error.json";

import enCommon from "./Locales/en/common.json";
import arCommon from "./Locales/ar/common.json";
import frCommon from "./Locales/fr/common.json";



i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: "en",

        resources: {
            en: {
                landing: enLanding,
                welcome: enWelcome,
                auth: enAuth,
                adhan: enAdhan,
                links: enLinks,
                footer: enFooter,
                tutorial: enTutorial,
                error: enError,
                common: enCommon
            },
            ar: {
                landing: arLanding,
                welcome: arWelcome,
                auth: arAuth,
                adhan: arAdhan,
                links: arLinks,
                footer: arFooter,
                tutorial: arTutorial,
                error: arError,
                common: arCommon
            },
            fr: {
                landing: frLanding,
                welcome: frWelcome,
                auth: frAuth,
                adhan: frAdhan,
                links: frLinks,
                footer: frFooter,
                tutorial: frTutorial,
                error: frError,
                common: frCommon
            }
        },

        ns: ["landing", "welcome", "auth", "adhan", "links", "footer", "tutorial", "error", "common"],
        defaultNS: "landing",
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;