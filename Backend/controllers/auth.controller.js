const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model.js");

/*const RegisterUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({ username, email, password: hashedPassword });

    // إذا أرسل المستخدم صورة
    if (req.file && req.file.path) {
      user.avatar = req.file.path; // رابط Cloudinary
    }

    await user.save();
    res.status(201).json({ message: "User created" });
  } catch (error) {
    console.error("RegisterUser error:", error); // 🔥 أضف هذا
    res.status(500).json({ error: error.message });
  }
};*/

const RegisterUser = async (req, res) => {
  try {
    const { username, famillyname, gender, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({ username, famillyname, gender, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: "User created" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user)
      return res.status(400).json({ message: "Invalid credentials" });

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const UploadImage = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);

    if (!req.file || !req.file.path)
      return res.status(400).json({ message: "No file uploaded" });

    user.avatar = req.file.path;
    await user.save();

    res.json({
      message: "Avatar uploaded successfully",
      avatar: user.avatar
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Upload failed" });
  }
};

module.exports = { RegisterUser, LoginUser, UploadImage };