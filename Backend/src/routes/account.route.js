const controller = require("../controllers/account.controller");
const express = require("express");
const router = express.Router();

// Create a new account
router.post("/", controller.createAccount);

// Get all accounts for a user
router.get("/user/:userId", controller.getAccountsByUserId);

// Get a specific account by ID
router.get("/:accountId", controller.getAccountById);

// Update an account
router.put("/:accountId", controller.updateAccount);

// Delete an account
router.delete("/:accountId", controller.deleteAccount);

//Total balance
router.get("/user/total/:userId", controller.getAccountTotalBalance);

module.exports = router;
