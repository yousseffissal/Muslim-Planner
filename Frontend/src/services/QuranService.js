import api from "../api/axios";

// 🔥 حفظ
export const saveProgress = async (surah, ayah) => {
    return await api.patch("/user/quran/progress", {
        surah,
        ayah
    });
};

// 🔥 جلب
export const getProgress = async () => {
    const res = await api.get("/user/quran/progress");
    return res.data.quranProgress;
};