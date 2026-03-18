import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { links } from '../tools/Links'
import { scrollToTop } from '../tools/ScrollTop'
import { useAuth } from '../context/AuthContext.jsx'
import assest from '../assets/asset2.png'

function Sidebar() {
    const { user, logout } = useAuth();
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const handleResize = () => {
            setIsVisible(window.innerWidth >= 770)
        }

        handleResize()

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return (
        <div className="w-72 h-[calc(100vh-64px)] 
                        bg-gradient-to-b from-gray-100 to-gray-200 
                        border-r border-gray-300 
                        shadow-sm flex flex-col overflow-hidden"
            style={{ display: isVisible ? 'flex' : 'none' }}
        >

            {/* 🔥 USER SECTION */}
            <div className="flex flex-col items-center py-6 border-b border-gray-300">
                
                <img
                    src={user?.avatar || assest}
                    alt="user"
                    className="w-28 h-28 rounded-full object-cover 
                               border-4 border-green-500 shadow-lg"
                />

                <h3 className="mt-4 text-xl font-bold text-gray-800 text-center">
                    {user?.username || "Guest"}
                </h3>

                {/* optional subtitle */}
                <p className="text-sm text-gray-500 mt-1">
                    Welcome back 👋
                </p>
            </div>

            {/* 🔥 NAVBAR SCROLLABLE */}
            <div className="flex-1 overflow-y-auto px-4 py-4">

                <h2 className="text-lg font-semibold text-green-700 mb-4">
                    Navigation
                </h2>

                <ul className="space-y-3 text-gray-700 font-medium">
                    {links.slice(0, 7).map((link) => (
                        <li key={link.name}>
                            <NavLink
                                to={link.path}
                                onClick={scrollToTop}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-4 py-3 rounded-lg
                                    transition-all duration-200
                                    ${isActive
                                        ? "bg-green-600 text-white font-semibold"
                                        : "hover:bg-[#eeb703] hover:text-white"
                                    }`
                                }
                            >
                                {link.icon} {link.name}
                            </NavLink>
                        </li>
                    ))}
                </ul>

            </div>

            <div className="p-4 border-t border-gray-300">
                <button
                    onClick={logout}
                    className="w-full flex items-center justify-center gap-2 
                               bg-red-500 hover:bg-red-600 
                               text-white font-semibold py-3 px-4 
                               rounded-xl transition-all duration-200 
                               shadow-md hover:shadow-lg"
                >
                    🚪 Logout
                </button>
            </div>

        </div>
    )
}

export default Sidebar