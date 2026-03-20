import assest from '../assets/asset1.jpg'
import { Link } from 'react-router-dom'
import background from '../assets/background6.jpg'
import backgrounddark from '../assets/background6-2.jpg'
import { useTheme } from "../context/ThemeContext";
function Welcome() {
    const { theme, mode } = useTheme();
    return (
        <div className="min-h-[calc(100vh-64px)] overflow-y-auto flex justify-center bg-no-repeat bg-center bg-cover"
            style={
                mode === "light"
                    ? { backgroundImage: `url(${background})` }
                    : { backgroundImage: `url(${backgrounddark})` }
            }>
            <div className="w-full overflow-y-auto flex justify-center items-start p-4">
                <div className="max-w-4xl shadow-2xl rounded-2xl p-10 flex flex-col items-center text-center"
                    style={{ background: theme.card }}>

                    {/* Title */}
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4"
                        style={{ color: theme.navbarlogo }}>
                        Welcome to Muslim Planner
                    </h1>

                    {/* Subtitle */}
                    <p className="text-lg md:text-xl mb-6"
                        style={{ color: theme.cardtext }}>
                        Your daily app that helps you organize your worship, remembrance (adhkar), Quran reading, and manage your daily tasks with ease and comfort.
                    </p>

                    {/* Buttons */}
                    <div className="flex justify-center items-center flex-col w-full WelcomeB:flex-row gap-4 mt-2">

                        <Link
                            to="/prayer-times"
                            className="w-full WelcomeB:w-auto text-center
                            text-white px-6 py-3 rounded-lg shadow-md
                            transition font-semibold
                            max-[445px]:px-4 max-[445px]:py-2 max-[445px]:text-sm"
                            style={{ background: theme.navbarlogo }}>
                            Start Your Day
                        </Link>

                        <button
                            className="w-full WelcomeB:w-auto border border-green-600 text-green-600 px-6 py-3 
                            rounded-lg shadow-md font-semibold transition
                            max-[445px]:px-4 max-[445px]:py-2 max-[445px]:text-sm"
                            style={{ color: theme.navbarlogo, border: `1px solid ${theme.navbarlogo}` }}
                        >
                            Explore Features
                        </button>

                    </div>

                    {/* Optional illustration */}
                    <img
                        src={assest}
                        alt="Muslim Planner"
                        className="mt-8 w-72 md:w-96 rounded-lg"
                    />

                </div>
            </div>
        </div>

    )
}

export default Welcome
