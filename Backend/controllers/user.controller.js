const User = require("../models/user.model.js");

const updateQuranProgress = async (req, res) => {
  try {

    const { surah, ayah } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.quranProgress.surah = Number(surah);
    user.quranProgress.ayah = Number(ayah);

    await user.save();

    res.json({
      message: "Progress updated",
      quranProgress: user.quranProgress
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getQuranProgress = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ progress: user.quranProgress });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const addTask = async (req, res) => {
  try {
    const { title } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const task = { title, completed: false };
    user.tasks.push(task);
    await user.save();

    res.status(201).json({ message: "Task added", tasks: user.tasks });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getTasks = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ tasks: user.tasks });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { completed } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const task = user.tasks.id(taskId);
    if (!task) return res.status(404).json({ message: "Task not found" });

    task.completed = completed;
    await user.save();

    res.json({ message: "Task updated", tasks: user.tasks });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// حذف مهمة
const deleteTask = async (req, res) => {
  try {

    const { taskId } = req.params;

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.tasks.pull(taskId);

    await user.save();

    res.json({
      message: "Task deleted",
      tasks: user.tasks
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getMe = async (req, res) => {

  try {

    const user = await User
      .findById(req.user.id)
      .select("-password");

    if (!user)
      return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);

  } catch (error) {

    res.status(500).json({
      message: "Server error",
      error: error.message
    });

  }

};

module.exports = { getMe };

module.exports = {
  updateQuranProgress,
  getQuranProgress,
  addTask,
  getTasks,
  updateTask,
  deleteTask,
  getMe
};