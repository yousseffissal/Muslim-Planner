import api from "../api/axios";

// Add a new task
export const addTask = async (title) => {
  try {
    const res = await api.post("/user/tasks", { title });
    return res.data;
  } catch (err) {
    const message =
      err.response?.data?.message || "Failed to add task";
    throw new Error(message);
  }
};

// Get all tasks
export const getTasks = async () => {
  try {
    const res = await api.get("/user/tasks");
    return res.data.tasks;
  } catch (err) {
    const message =
      err.response?.data?.message || "Failed to fetch tasks";
    throw new Error(message);
  }
};

// Update a task (FIXED)
export const updateTask = async (taskId, completed) => {
  try {
    const res = await api.patch(`/user/tasks/${taskId}`, {
      completed
    });
    return res.data;
  } catch (err) {
    const message =
      err.response?.data?.message || "Failed to update task";
    throw new Error(message);
  }
};

// Delete a task (MISSING → now added)
export const deleteTask = async (taskId) => {
  try {
    const res = await api.delete(`/user/tasks/${taskId}`);
    return res.data;
  } catch (err) {
    const message =
      err.response?.data?.message || "Failed to delete task";
    throw new Error(message);
  }
};