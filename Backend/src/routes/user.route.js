const controller = require("../controllers/user.controller");
const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

// User registration
router.post("/register", controller.userRegister);

// User login
router.post("/login", controller.userLogin);

// Upload profile image
router.post(
  "/profile-image",
  upload.single("profileImage"),
  controller.uploadProfileImage
);

// Get user by email
router.get("/:email", controller.getUserByEmail);

// Update user
router.put("/", controller.updateUser);

// Delete user
router.delete("/:id", controller.deleteUser);

// Get all users
router.get("/", controller.getAllUsers);

module.exports = router;
