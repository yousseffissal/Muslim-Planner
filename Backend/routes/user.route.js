const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  updateQuranProgress,
  getQuranProgress,
  addTask,
  getTasks,
  updateTask,
  deleteTask,
  getMe
} = require("../controllers/user.controller");

router.get("/me", auth, getMe);

// Quran Progress
router.patch("/quran/progress", auth, updateQuranProgress);
router.get("/quran/progress", auth, getQuranProgress);

// Tasks
router.post("/tasks", auth, addTask);
router.get("/tasks", auth, getTasks);
router.patch("/tasks/:taskId", auth, updateTask);
router.delete("/tasks/:taskId", auth, deleteTask);

module.exports = router;