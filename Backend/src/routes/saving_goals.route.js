const controller = require("../controllers/saving_goals.controller");
const express = require("express");
const router = express.Router();

// Create a new saving goal
router.post("/", controller.createSavingGoal);

// Get all saving goals for a user
router.get("/user/:userId", controller.getSavingGoalsByUserId);

// Get a specific saving goal by ID
router.get("/:goalId", controller.getSavingGoalById);

// Update a saving goal
router.put("/:goalId", controller.updateSavingGoal);

// Delete a saving goal
router.delete("/:goalId", controller.deleteSavingGoal);

// Update saving goal progress
router.patch("/:goalId/progress", controller.updateSavingGoalProgress);

module.exports = router;
