import api from "../api/axios";

// Save Quran progress
export const saveProgress = async (surah, ayah) => {
  try {
    const res = await api.patch("/user/quran/progress", {
      surah,
      ayah,
    });

    return res.data;
  } catch (err) {
    const message =
      err.response?.data?.message || "Failed to save progress";
    throw new Error(message);
  }
};

// Get Quran progress
export const getProgress = async () => {
  try {
    const res = await api.get("/user/quran/progress");
    console.log("API Response:", res.data);
    return res.data.progress;
  } catch (err) {
    const message =
      err.response?.data?.message || "Failed to fetch progress";
    throw new Error(message);
  }
};