import { FaGithub, FaLinkedin, FaInstagram  } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

function OwnerPage() {
    return (
        <div className="min-h-[calc(100vh-64px)] flex items-stretch justify-center bg-[#e6f9e6] p-6">
            <div className="max-w-xl bg-white shadow-2xl rounded-3xl p-8 text-center space-y-6">

                <img
                    className="w-40 h-40 md:w-56 md:h-56 object-cover rounded-full mx-auto shadow-md"
                    src="/me.png"
                    alt="Youssef Fissal"
                />

                <div className="space-y-2">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                        Youssef Fissal
                    </h1>
                    <p className="text-gray-600">
                        This project was developed and maintained by Youssef Fissal.
                    </p>
                </div>

                {/* Social Media Section */}
                <div className="pt-2">
                    <h2 className="text-lg font-semibold text-gray-700 mb-4">
                            Follow/Contact me
                    </h2>

                    <div className="flex justify-center gap-5">

                        <a
                            href="https://github.com/yousseffissal"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-600 hover:text-black transition text-2xl"
                        >
                            <FaGithub />
                        </a>

                        <a
                            href="https://www.linkedin.com/in/youssef-fissal"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-600 hover:text-blue-600 transition text-2xl"
                        >
                            <FaLinkedin />
                        </a>

                        <a
                            href="https://www.instagram.com/fissal_youssef/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-600 hover:text-red-600 transition text-2xl"
                        >
                            <FaInstagram  />
                        </a>

                        <a
                            href="mailto:youssefpaxar1@gmail.com?subject=Contact&body=Hello Youssef,"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-600 hover:text-green-500 transition text-2xl"
                        >
                            <MdEmail />
                        </a>

                    </div>
                </div>

                <p className="text-sm text-gray-400 pt-4">
                    © {new Date().getFullYear()} Youssef Fissal. All rights reserved.
                </p>

            </div>
        </div>
    );
}

export default OwnerPage;
