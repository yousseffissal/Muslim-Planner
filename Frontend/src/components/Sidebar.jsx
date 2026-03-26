import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { links } from '../tools/Links'
import { scrollToTop } from '../tools/ScrollTop'
import { useAuth } from '../context/AuthContext.jsx'
import male from '../assets/male.png'
import female from '../assets/female.png'
import { useTheme } from "../context/ThemeContext";


function Sidebar() {
    const { user } = useAuth();
    const [isVisible, setIsVisible] = useState(false)
    const { theme } = useTheme();

    useEffect(() => {
        const handleResize = () => {
            setIsVisible(window.innerWidth >= 925)
        }

        handleResize()

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return (
        <div className="w-72 h-[calc(100vh-64px)] 
                        bg-gradient-to-b from-gray-100 to-gray-200 
                        shadow-sm flex flex-col overflow-hidden"
            style={{
                display: isVisible ? 'flex' : 'none',
                background: theme.navbarmobile
            }}
        >

            {/* 🔥 USER SECTION */}
            <div className="relative flex flex-col items-center w-full border-b border-gray-300">

                <div
                    className="w-full h-20"
                    style={{
                        background: "linear-gradient(90deg, #FFD700, #FFC300, #FFB700)",
                    }}
                ></div>

                {/* Avatar */}
                <div className='rounded-full -mt-14 z-10'
                    style={{ background: theme.navbarmobile, border: `4px solid ${theme.navbaractivelink}` }}>
                    <img
                        src={user?.gender ? user?.gender === "male" ? male : female : male}
                        alt="user"
                        className="w-28 h-28 rounded-full object-cover"
                        style={{ border: `4px solid ${theme.navbarmobile}` }}
                    />
                </div>

                <h3 className="mt-4 text-2xl font-bold text-gray-800 text-center z-10 relative"
                    style={{ color: theme.navbarmobilelinks }}>
                    {user?.username || "Jhon"} {user?.famillyname || ""}
                </h3>

                <p className="mb-5 text-sm text-gray-500 mt-1 relative z-10"
                    style={{ color: theme.navbarmobilelinks }}>
                    {user?.email || "guest@example.com"}
                </p>
            </div>

            {/* 🔥 NAVBAR SCROLLABLE */}
            <div className="flex-1 overflow-y-auto px-4 py-4">

                <h2 className="text-lg font-semibold mb-4"
                    style={{ color: theme.navbarlogo }}>
                    Navigation
                </h2>

                <ul className="space-y-3 text-gray-700 font-medium">
                    {links.slice(0, 7).map((link) => (
                        <li key={link.name}>
                            <NavLink
                                to={link.path}
                                onClick={scrollToTop}
                                className={({ isActive }) =>
                                    `block px-4 py-2 rounded-lg transition-all duration-200
                                         ${isActive
                                        ? "font-semibold"
                                        : "hover:bg-[#ffb70054] hover:font-semibold "
                                    }`
                                }
                                style={({ isActive }) =>
                                    isActive
                                        ? {
                                            color: theme.navbarmobileactivelink,
                                            background: theme.navbaractivelink,
                                        }
                                        : { color: theme.navbarmobilelinks }
                                }
                            >
                                {link.icon} {link.name}
                            </NavLink>
                        </li>
                    ))}
                </ul>

            </div>

        </div>
    )
}

export default Sidebar