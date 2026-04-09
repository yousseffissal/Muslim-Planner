import { NavLink } from "react-router-dom"
import { scrollToTop } from '../tools/ScrollTop'
import { useLinks } from '../tools/Links'
import { useTranslation } from "react-i18next";
import i18n from "i18next";

function Footer() {
    const links = useLinks();
     const { t } = useTranslation("footer");

    return (
        <footer className="bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto px-8 py-10">

                {/* Top Section */}
                <div className="grid md:grid-cols-3 gap-8">

                    {/* Brand */}
                    <div
                    dir={i18n.language === "ar" ? "rtl" : "ltr"}>
                        <h2 className="text-2xl font-bold text-green-500 mb-4">
                           Muslim Planner
                        </h2>
                        <p className="text-gray-400 leading-relaxed">
                            {t("footer.description1")}
                        </p>
                    </div>

                    {/* Navigation */}
                    <div
                    dir={i18n.language === "ar" ? "rtl" : "ltr"}
                    >
                        <h3 className="text-lg font-semibold mb-4 text-green-500">
                            {t("footer.quickLinks")}
                        </h3>
                        <div className="md:grid md:grid-cols-2 flex flex-col md:gap-8 gap-2">
                            <ul className="space-y-2 text-gray-300">
                            {links.slice(0, 4).map((link) => (
                                <li key={link.name} onClick={scrollToTop}>
                                    <NavLink to={link.path}>
                                        {link.name}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                        <ul className="space-y-2 text-gray-300">
                            {links.slice(4, 8).map((link) => (
                                <li key={link.name} onClick={scrollToTop}>
                                    <NavLink to={link.path}>
                                        {link.name}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>

                        </div>
                    </div>

                    {/* Contact / Info */}
                    <div dir={i18n.language === "ar" ? "rtl" : "ltr"}>
                        <h3 className="text-lg font-semibold mb-4 text-green-500">
                            {t("footer.about")}
                        </h3>
                        <p className="text-gray-400">
                            {t("footer.description2")}
                        </p>
                    </div>

                </div>

                {/* Bottom Section */}
                <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-500 text-sm"
                dir={i18n.language === "ar" ? "rtl" : "ltr"}>
                    © {new Date().getFullYear()} Muslim Planner - {t("footer.copyright")}
                </div>

            </div>
        </footer>
    )
}

export default Footer
