const controller = require("../controllers/user.controller");
const express = require("express");
const router = express.Router();

// User registration
router.post("/register", controller.userRegister);

// User login
router.post("/login", controller.userLogin);

// Get user by email
router.get("/:email", controller.getUserByEmail);

// Update user
router.put("/", controller.updateUser);

// Delete user
router.delete("/:id", controller.deleteUser);

// Get all users
router.get("/", controller.getAllUsers);

module.exports = router;
