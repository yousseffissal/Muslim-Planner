import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { links } from '../tools/Links'
import { scrollToTop } from '../tools/ScrollTop'
import { BiMenu } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { useAuth } from "../context/AuthContext.jsx"
import assest from '../assets/asset2.png'

function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const visibleIndexes = [0, 1, 2, 7];
    const { user, logout } = useAuth();

    return (
        <nav className="bg-white shadow-md border-b border-green-100 w-full h-16 fixed top-0 z-100">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex justify-between items-center h-16">

                    <Link
                        to={'/app/dashboard'}
                        onClick={scrollToTop}
                    >
                        <div className='flex justify-center items-center gap-2'>
                            <img src="/Icon.png" alt="Muslim Planner Logo" className="h-7 w-7" />
                            <span className="text-2xl font-bold text-green-600">
                                Muslim Planner
                            </span>
                        </div>
                    </Link>

                    {/* Desktop */}
                    <div className="hidden navbar:flex space-x-8 text-gray-700 font-medium">
                        {links
                            .filter((_, index) => visibleIndexes.includes(index))
                            .map((link) => (
                                <NavLink
                                    key={link.name}
                                    to={link.path}
                                    onClick={scrollToTop}
                                    className={({ isActive }) =>
                                        isActive
                                            ? "text-green-600 font-semibold border-b-2 border-green-600"
                                            : "hover:text-[#eeb703] transition"
                                    }
                                >
                                    {link.name}
                                </NavLink>
                            ))}
                    </div>

                    {/* Mobile Button */}
                    <button
                        className="md:hidden text-green-600 text-2xl"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? " " : <BiMenu />}
                    </button>

                </div>
            </div>

            {/* 🔥 Mobile Menu */}
            {isOpen && (
                <div className="fixed inset-0 z-40 md:hidden">

                    {/* 🔥 OVERLAY */}
                    <div
                        className="absolute inset-0"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* 🔥 MENU */}
                    <div className="absolute top-16 right-0 h-[calc(100vh-64px)] w-72 
                        bg-white shadow-xl flex flex-col overflow-hidden">

                        {/* USER */}
                        <div className="flex flex-col items-center py-6 border-b border-gray-200">
                            <img
                                src={user?.avatar || assest}
                                alt="user"
                                className="w-24 h-24 rounded-full object-cover 
                               border-4 border-green-500 shadow-lg"
                            />

                            <h3 className="mt-3 text-lg font-bold text-gray-800 text-center">
                                {user?.username || "Guest"}
                            </h3>

                            <p className="text-sm text-gray-500">
                                Welcome back 👋
                            </p>
                        </div>

                        {/* LINKS */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-3 text-gray-700 font-medium">
                            {links.map((link) => (
                                <NavLink
                                    key={link.name}
                                    to={link.path}
                                    onClick={() => {
                                        setIsOpen(false);
                                        scrollToTop();
                                    }}
                                    className={({ isActive }) =>
                                        `block px-4 py-3 rounded-lg transition-all duration-200
                            ${isActive
                                            ? "bg-green-600 text-white font-semibold"
                                            : "hover:bg-[#eeb703] hover:text-white"
                                        }`
                                    }
                                >
                                    {link.name}
                                </NavLink>
                            ))}
                        </div>

                        {/* LOGOUT */}
                        <div className="p-4 border-t border-gray-200">
                            <button
                                onClick={() => {
                                    logout();
                                    setIsOpen(false);
                                }}
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
                </div>
            )}

        </nav>
    )
}

export default Navbar