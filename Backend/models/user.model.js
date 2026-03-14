const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    quranProgress: {
        surah: { type: Number, default: 1 },
        ayah: { type: Number, default: 1 }
    },

    tasks: [
        {
            title: String,
            completed: { type: Boolean, default: false },
            createdAt: { type: Date, default: Date.now }
        }
    ]
});

module.exports = mongoose.model("User", UserSchema);