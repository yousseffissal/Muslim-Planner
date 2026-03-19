import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { links } from '../tools/Links'
import { scrollToTop } from '../tools/ScrollTop'
import { useAuth } from '../context/AuthContext.jsx'
import assest from '../assets/asset2.png'

function Sidebar() {
    const { user } = useAuth();
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
            <div className="relative flex flex-col items-center w-full border-b border-gray-300">

                {/* Cover صغير خلف الـ Avatar */}
                <div
                    className="w-full h-20 bg-cover bg-center bg-yellow-400"
                    /*style={{
                        backgroundImage: `url(${assest})`,
                    }}*/
                ></div>

                {/* Avatar */}
                <img
                    src={user?.avatar || assest}
                    alt="user"
                    className="w-28 h-28 rounded-full object-cover border-4 border-green-500 shadow-lg -mt-14 z-10 bg-gray-200"
                />

                <h3 className="mt-4 text-2xl font-bold text-gray-800 text-center z-10 relative">
                    {user?.username || "Guest"}
                </h3>

                <p className="mb-5 text-lg text-gray-500 mt-1 relative z-10">
                    {user?.email || "guest@example.com"}
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

        </div>
    )
}

export default Sidebar