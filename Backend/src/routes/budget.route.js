const express = require("express");
const router = express.Router();
const budgetController = require("../controllers/budget.controller");

// GET all budgets
router.get("/", budgetController.getAllBudgets);

// GET budget by ID
router.get("/:id", budgetController.getBudgetById);

// GET budgets by category with time filters
router.get(
  "/user/:userId/category/:categoryId",
  budgetController.getBudgetsByCategory
);

// GET active budgets by user ID
router.get("/user/:userId/active", budgetController.getActiveBudgetsByUserId);

// GET budgets by user ID (with time filters)
router.get("/user/:userId", budgetController.getBudgetsByUserId);

// GET budget progress
router.get("/:id/progress", budgetController.getBudgetProgress);

// POST create new budget
router.post("/", budgetController.createBudget);

// PUT update budget
router.put("/:id", budgetController.updateBudget);

// DELETE budget
router.delete("/:id", budgetController.deleteBudget);

// GET budget progress by user ID
router.get(
  "/user/:userId/progress",
  budgetController.getBudgetProgressByUserId
);

module.exports = router;
