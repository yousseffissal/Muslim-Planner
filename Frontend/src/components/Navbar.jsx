import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { links } from '../tools/Links.js'
import { scrollToTop } from '../tools/ScrollTop'
import { BiMenu } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { useAuth } from "../context/AuthContext.jsx"
import male from '../assets/male.png'
import female from '../assets/female.png'
import Swal from "sweetalert2";
import successIcon from "../assets/success.png";
import ThemeToggle from "../components/ThemeToggle.jsx"
import { useTheme } from "../context/ThemeContext";

function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const visibleIndexes = [0, 1, 2, 7];
    const { user, logout } = useAuth();
    const { theme } = useTheme();

    return (
        <nav className="shadow-md  w-full h-16 fixed top-0 z-100"
            style={{ background: theme.navbar }}>
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex justify-between items-center h-16">

                    <Link
                        to={'/app/dashboard'}
                        onClick={scrollToTop}
                    >
                        <div className='flex justify-center items-center gap-2'>
                            <img src="/Icon.png" alt="Muslim Planner Logo" className="h-7 w-7" />
                            <span className="text-2xl font-bold"
                                style={{ color: theme.navbarlogo }}>
                                Muslim Planner
                            </span>
                        </div>
                    </Link>

                    {/* Desktop */}
                    <div className="hidden navbar:flex space-x-8 font-medium"
                        style={{ color: theme.navbarlinks }}>
                        {links
                            .filter((_, index) => visibleIndexes.includes(index))
                            .map((link) => (
                                <NavLink
                                    key={link.name}
                                    to={link.path}
                                    onClick={scrollToTop}
                                    className={({ isActive }) =>
                                        isActive
                                            ? "font-semibold border-b-2"
                                            : "hover:text-[#eeb703] transition"
                                    }
                                    style={({ isActive }) =>
                                        isActive
                                            ? {
                                                color: theme.navbaractivelink,
                                                borderColor: theme.navbaractivelink,
                                            }
                                            : {}
                                    }
                                >
                                    {link.name}
                                </NavLink>
                            ))}
                    </div>

                    <div className='hidden navbar:flex gap-4'>

                        <button
                            onClick={async () => {
                                const result = await Swal.fire({
                                    text: "Are you sure you want to logout?",
                                    icon: "warning",
                                    showCancelButton: true,
                                    confirmButtonText: "Logout",
                                    cancelButtonText: "Cancel",
                                    customClass: {
                                        popup: "swal-popup-green",
                                        title: "swal-title-green",
                                        content: "swal-content-green",
                                        confirmButton: "swal-btn-green",
                                        cancelButton: "swal-btn-red",
                                    },
                                    buttonsStyling: false,
                                });

                                if (result.isConfirmed) {
                                    logout();
                                    setIsOpen(false);
                                    await Swal.fire({
                                        title: "Logged Out",
                                        text: "You have been logged out, see you soon!",
                                        icon: successIcon,
                                        confirmButtonText: "OK",
                                        imageUrl: successIcon,
                                        imageWidth: 80,
                                        imageHeight: 80,
                                        imageAlt: "Custom icon",
                                        customClass: {
                                            popup: "swal-popup-green",
                                            confirmButton: "swal-btn-green",
                                        },
                                        buttonsStyling: false,
                                    });
                                }
                            }}
                            className="flex items-center justify-center
                                bg-red-500 hover:bg-red-600 
                                text-white font-semibold py-2 px-4 
                                rounded-xl
                                 hover:shadow-lg shadow-md"
                        >
                            Logout
                        </button>

                        <ThemeToggle />
                    </div>




                    {/* Mobile Button */}
                    <button
                        className="navbar:hidden text-2xl"
                        style={{ color: theme.navbarmenu }}
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <AiOutlineClose /> : <BiMenu />}
                    </button>

                </div>
            </div>

            {/* 🔥 Mobile Menu */}
            {isOpen && (
                <div className="fixed inset-0 z-40 navbar:hidden">

                    {/* 🔥 OVERLAY */}
                    <div
                        className="absolute inset-0"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* 🔥 MENU */}
                    <div className="absolute top-16 right-0 h-[calc(100vh-64px)] w-72 
                        shadow-xl flex flex-col overflow-hidden"
                        style={{ background: theme.navbarmobile }}>

                        {/* 🔥 USER SECTION */}
                        <div className="relative flex flex-col items-center w-full border-b"
                            style={{ background: theme.navbarmobile }}>

                            {/* Avatar */}
                            <div
                                className="w-full h-20 bg-cover bg-center"
                                style={{
                                    background: "linear-gradient(90deg, #FFD700, #FFC300, #FFB700)",
                                }}
                            /*style={{
                                backgroundImage: `url(${assest})`,
                            }}*/
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

                            <h3 className="mt-4 text-xl font-bold text-center z-10 relative"
                                style={{ color: theme.navbarmobilelinks }}>
                                {user?.username || "Jhon"} {user?.famillyname || ""}
                            </h3>

                            <p className="mb-5 text-sm  mt-1 relative z-10"
                                style={{ color: theme.navbarmobilelinks }}>
                                {user?.email || "guest@example.com"}
                            </p>
                        </div>

                        {/* LINKS */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-3 font-medium ">
                            {links.map((link) => (
                                <NavLink
                                    key={link.name}
                                    to={link.path}
                                    onClick={() => {
                                        setIsOpen(false);
                                        scrollToTop();
                                    }}
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
                                    {link.name}
                                </NavLink>
                            ))}
                        </div>

                        {/* LOGOUT */}
                        <div className="flex gap-3 justify-center items-center p-4  border-t border-gray-200">
                            <ThemeToggle />
                            <button
                                onClick={async () => {
                                    const result = await Swal.fire({
                                        text: "Are you sure you want to logout?",
                                        icon: "warning",
                                        showCancelButton: true,
                                        confirmButtonText: "Logout",
                                        cancelButtonText: "Cancel",
                                        customClass: {
                                            popup: "swal-popup-green",
                                            title: "swal-title-green",
                                            content: "swal-content-green",
                                            confirmButton: "swal-btn-green",
                                            cancelButton: "swal-btn-red",
                                        },
                                        buttonsStyling: false,
                                    });

                                    if (result.isConfirmed) {
                                        logout();
                                        setIsOpen(false);
                                        await Swal.fire({
                                            title: "Logged Out",
                                            text: "You have been logged out, see you soon!",
                                            icon: successIcon,
                                            confirmButtonText: "OK",
                                            imageUrl: successIcon,
                                            imageWidth: 80,
                                            imageHeight: 80,
                                            imageAlt: "Custom icon",
                                            customClass: {
                                                popup: "swal-popup-green",
                                                confirmButton: "swal-btn-green",
                                            },
                                            buttonsStyling: false,
                                        });
                                    }
                                }}
                                className="w-full flex items-center justify-center gap-2 
                                    bg-red-500 hover:bg-red-600 
                                    text-white font-semibold py-2 px-4 
                                    rounded-xl transition-all duration-200 
                                    shadow-md hover:shadow-lg"
                            >
                                Logout
                            </button>
                        </div>

                    </div>
                </div>
            )}

        </nav>
    )
}

export default Navbar