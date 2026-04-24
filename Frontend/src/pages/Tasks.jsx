import { useEffect, useState } from "react";
import {
    getTasks,
    addTask,
    updateTask,
    deleteTask,
} from "../services/TestService.js";
import { useTranslation } from "react-i18next";
import i18n from "i18next";
import { useTheme } from "../context/ThemeContext";

export default function TasksPage() {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState("");
    const [loading, setLoading] = useState(false);
    const { t } = useTranslation("tasks");
    const { theme, mode } = useTheme();

    const [openMenuId, setOpenMenuId] = useState(null);

    const toggleMenu = (id) => {
        setOpenMenuId(openMenuId === id ? null : id);
    };

    useEffect(() => {
        const handleClick = () => setOpenMenuId(null);
        window.addEventListener("click", handleClick);
        return () => window.removeEventListener("click", handleClick);
    }, []);

    const fetchTasks = async () => {
        try {
            setLoading(true);
            const data = await getTasks();
            setTasks(data);
        } catch (err) {
            console.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleAdd = async () => {
        if (!title.trim()) return;

        try {
            await addTask(title);
            setTitle("");
            fetchTasks();
        } catch (err) {
            console.error(err.message);
        }
    };

    const handleToggle = async (task) => {
        try {
            await updateTask(task._id, !task.completed);
            fetchTasks();
        } catch (err) {
            console.error(err.message);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this task?")) return;

        try {
            await deleteTask(id);
            fetchTasks();
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <div className="min-h-screen p-6 flex justify-center items-start transition-colors duration-300"
            style={{ background: theme.quranpage }}>
            <div className="w-full max-w-5xl">

                {/* Add Task Card */}
                <div className="backdrop-blur-md p-4 rounded-2xl shadow-lg mb-6 flex gap-3"
                    style={{ background: theme.card }}>
                    <input
                        type="text"
                        placeholder={t("landing.addTaskPlaceholder")}
                        className="flex-1 p-3 rounded-xl outline-none
                        bg-transparent"
                        style={{
                            color: theme.cardtext,
                            border: mode !== "light" ? `1px solid white` : `1px solid #2563EB`

                        }}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        dir={i18n.language === "ar" ? "rtl" : "ltr"}
                    />
                    <button
                        onClick={handleAdd}
                        className="bg-blue-600 hover:bg-blue-700 transition px-5 py-2 rounded-xl text-white font-semibold shadow"
                    >
                        {t("landing.addButton")}
                    </button>
                </div>

                {/* Table Card */}
                <div className="backdrop-blur-md rounded-2xl shadow-lg overflow-hidden"
                    dir={i18n.language === "ar" ? "rtl" : "ltr"}
                    style={{
                        background: theme.card,
                        color: theme.cardtext
                    }}>

                    {loading ? (
                        <div className="p-10 text-center animate-pulse"
                            style={{
                                color: theme.cardtext
                            }}>
                            {t("landing.loading")}
                        </div>
                    ) : tasks.length === 0 ? (
                        <div className="p-10 text-center" style={{ color: theme.cardtext }}>
                            <p className="text-lg">{t("landing.noTasks")}</p>
                            <p className="text-sm mt-2">{t("landing.startTask")}</p>
                        </div>
                    ) : (
                        <table className="w-full text-left"
                            style={{
                                color: theme.navbarlinks
                            }}>
                            <thead className="uppercase text-sm text-center"
                                style={{
                                    background: theme.tasktableheader,
                                    color: theme.navbarlinks
                                }}>
                                <tr>
                                    <th className="p-4">{t("landing.table.task")}</th>
                                    <th className="p-4">{t("landing.table.status")}</th>
                                    <th className="p-4 text-center">{t("landing.table.actions")}</th>
                                </tr>
                            </thead>

                            <tbody className="text-center">
                                {tasks.map((task) => (
                                    <tr
                                        key={task._id}
                                        className="transition"
                                    >
                                        <td className="p-4 font-medium">
                                            {task.title}
                                        </td>

                                        <td className="p-4">
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-semibold ${task.completed ? mode !== "light"
                                                    ? "bg-green-500/20 text-green-400" :
                                                    "bg-green-700/20 text-green-600" : mode !== "light" ? "bg-yellow-500/20 text-yellow-400" :
                                                    "bg-yellow-700/20 text-yellow-600"

                                                    }`}
                                            >
                                                {task.completed ? t("landing.status.completed") : t("landing.status.pending")}
                                            </span>
                                        </td>

                                        <td className="p-4 text-center relative">

                                            {/* Desktop buttons */}
                                            <div className="hidden sm:flex justify-center gap-3">
                                                <button
                                                    onClick={() => handleToggle(task)}
                                                    className="bg-indigo-600 hover:bg-indigo-700 transition px-3 py-1 rounded-lg text-sm text-white"
                                                >
                                                    {t("landing.buttons.toggle")}
                                                </button>

                                                <button
                                                    onClick={() => handleDelete(task._id)}
                                                    className="bg-red-600 hover:bg-red-700 transition px-3 py-1 rounded-lg text-sm text-white"
                                                >
                                                    {t("landing.buttons.delete")}
                                                </button>
                                            </div>

                                            {/* Mobile menu button */}
                                            <div className="sm:hidden">
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        toggleMenu(task._id);
                                                    }}
                                                    className="text-xl px-2 py-1 rounded-md"
                                                >
                                                    ⋮
                                                </button>

                                                {/* Dropdown */}
                                                {openMenuId === task._id && (
                                                    <div
                                                        className="absolute right-0 mt-0 min-w-32 rounded-xl shadow-lg z-20 overflow-hidden"
                                                        style={{ background: theme.tablebuttonmenu, color: theme.cardtext }}
                                                    >
                                                        <button
                                                            onClick={() => {
                                                                handleToggle(task);
                                                                setOpenMenuId(null);
                                                            }}
                                                            className="block w-full text-left px-4 py-2 hover:bg-gray-700/20"
                                                        >
                                                            {t("landing.buttons.toggle")}
                                                        </button>

                                                        <button
                                                            onClick={() => {
                                                                handleDelete(task._id);
                                                                setOpenMenuId(null);
                                                            }}
                                                            className="block w-full text-left px-4 py-2 hover:bg-red-500/20 text-red-500"
                                                        >
                                                            {t("landing.buttons.delete")}
                                                        </button>
                                                    </div>
                                                )}
                                            </div>

                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
}