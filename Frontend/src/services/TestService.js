import api from "../api/axios";

// Save Quran progress
export const addTask = async (title) => {
  try {
    const res = await api.patch("/user//tasks", {
      title
    });

    return res.data;
  } catch (err) {
    const message =
      err.response?.data?.message || "Failed to add task";
    throw new Error(message);
  }
};

// Get Quran progress
export const getProgress = async () => {
  try {
    const res = await api.get("/user/quran/progress");
    return res.data.progress;
  } catch (err) {
    const message =
      err.response?.data?.message || "Failed to fetch progress";
    throw new Error(message);
  }
};