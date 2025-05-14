const express = require("express");
const router = express.Router();
const transactionController = require("../controllers/transaction.controller");

// GET all transactions
router.get("/", transactionController.getAllTransactions);

// GET transaction by ID
router.get("/:id", transactionController.getTransactionById);

// GET transactions by user ID
router.get("/user/:userId", transactionController.getTransactionsByUserId);

// GET transactions by type (income/expense/saving)
router.get(
  "/user/:userId/type/:type",
  transactionController.getTransactionsByType
);

// GET transaction summary for dashboard
router.get("/summary/:userId", transactionController.getTransactionSummary);

// POST create new transaction
router.post("/", transactionController.createTransaction);

// PUT update transaction
router.put("/:id", transactionController.updateTransaction);

// DELETE transaction
router.delete("/:id", transactionController.deleteTransaction);

module.exports = router;
