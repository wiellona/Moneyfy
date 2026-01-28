const accountRepository = require("../repository/account.repository");
const budgetRepository = require("../repository/budget.repository");
const transactionRepository = require("../repository/transaction.repository");
const baseResponse = require("../utils/baseResponse.util");

exports.createAccount = async (req, res) => {
  try {
    // Validate input
    if (!req.body.user_id || !req.body.name || req.body.type === undefined) {
      return baseResponse(
        res,
        false,
        400,
        "All fields are required (user_id, name, type)",
        null,
      );
    }

    // Validate account type
    const validTypes = ["bank", "digital_wallet", "cash"];
    if (!validTypes.includes(req.body.type)) {
      return baseResponse(
        res,
        false,
        400,
        `Invalid account type. Must be one of: ${validTypes.join(", ")}`,
        null,
      );
    }

    // Create account
    const accountPayload = {
      user_id: req.body.user_id,
      name: req.body.name,
      total_savings: req.body.total_savings ?? 0,
      type: req.body.type,
    };

    const account = await accountRepository.createAccount(accountPayload);

    return baseResponse(
      res,
      true,
      201,
      "Account created successfully",
      account,
    );
  } catch (error) {
    console.error("Error creating account:", error);
    return baseResponse(res, false, 500, "Internal server error", null);
  }
};

exports.getAccountsByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;

    if (!userId) {
      return baseResponse(res, false, 400, "User ID is required", null);
    }

    const accounts = await accountRepository.getAccountsByUserId(userId);

    return baseResponse(
      res,
      true,
      200,
      "Accounts retrieved successfully",
      accounts,
    );
  } catch (error) {
    console.error("Error getting accounts:", error);
    return baseResponse(res, false, 500, "Internal server error", null);
  }
};

exports.getAccountById = async (req, res) => {
  try {
    const accountId = req.params.accountId;

    if (!accountId) {
      return baseResponse(res, false, 400, "Account ID is required", null);
    }

    const account = await accountRepository.getAccountById(accountId);

    if (!account) {
      return baseResponse(res, false, 404, "Account not found", null);
    }

    return baseResponse(
      res,
      true,
      200,
      "Account retrieved successfully",
      account,
    );
  } catch (error) {
    console.error("Error getting account:", error);
    return baseResponse(res, false, 500, "Internal server error", null);
  }
};

exports.updateAccount = async (req, res) => {
  try {
    const accountId = req.params.accountId;

    if (!accountId) {
      return baseResponse(res, false, 400, "Account ID is required", null);
    }

    // Check if account exists
    const existingAccount = await accountRepository.getAccountById(accountId);

    if (!existingAccount) {
      return baseResponse(res, false, 404, "Account not found", null);
    }

    // Validate account type if provided
    if (req.body.type) {
      const validTypes = ["bank", "digital_wallet", "cash"];
      if (!validTypes.includes(req.body.type)) {
        return baseResponse(
          res,
          false,
          400,
          `Invalid account type. Must be one of: ${validTypes.join(", ")}`,
          null,
        );
      }
    }

    // Update account with provided fields or keep existing values
    const updatedAccountData = {
      name: req.body.name || existingAccount.name,
      total_savings:
        req.body.total_savings !== undefined
          ? req.body.total_savings
          : existingAccount.total_savings,
      type: req.body.type || existingAccount.type,
    };

    const updatedAccount = await accountRepository.updateAccount(
      accountId,
      updatedAccountData,
    );

    return baseResponse(
      res,
      true,
      200,
      "Account updated successfully",
      updatedAccount,
    );
  } catch (error) {
    console.error("Error updating account:", error);
    return baseResponse(res, false, 500, "Internal server error", null);
  }
};

exports.deleteAccount = async (req, res) => {
  try {
    const accountId = req.params.accountId;

    if (!accountId) {
      return baseResponse(res, false, 400, "Account ID is required", null);
    }

    // Check if account exists
    const existingAccount = await accountRepository.getAccountById(accountId);

    if (!existingAccount) {
      return baseResponse(res, false, 404, "Account not found", null);
    }

    const deletedAccount = await accountRepository.deleteAccount(accountId);

    return baseResponse(
      res,
      true,
      200,
      "Account deleted successfully",
      deletedAccount,
    );
  } catch (error) {
    console.error("Error deleting account:", error);
    return baseResponse(res, false, 500, "Internal server error", null);
  }
};

exports.getAccountTotalBalance = async (req, res) => {
  try {
    const userId = req.params.userId;

    if (!userId) {
      return baseResponse(res, false, 400, "User ID is required", null);
    }

    const accounts = await accountRepository.getAccountsByUserId(userId);

    if (!accounts || accounts.length === 0) {
      return baseResponse(
        res,
        false,
        404,
        "No accounts found for this user",
        null,
      );
    }

    const totalBalance = accounts.reduce(
      (acc, account) => acc + (account.total_savings || 0),
      0,
    );

    return baseResponse(
      res,
      true,
      200,
      "Total balance retrieved successfully",
      { totalBalance },
    );
  } catch (error) {
    console.error("Error getting total balance:", error);
    return baseResponse(res, false, 500, "Internal server error", null);
  }
};

exports.getTotalSavings = async (req, res) => {
  try {
    const { userId } = req.params;
    const row = await accountRepository.getTotalSavingsByUserId(userId);
    return baseResponse(
      res,
      true,
      200,
      "Total savings retrieved successfully",
      { total_savings: Number(row.total_savings) },
    );
  } catch (error) {
    console.error("Error getting total savings:", error);
    return baseResponse(res, false, 500, "Internal server error", null);
  }
};

exports.getMonthlyBalance = async (req, res) => {
  try {
    const { userId } = req.params;
    const month = parseInt(req.query.month) || new Date().getMonth() + 1;
    const year = parseInt(req.query.year) || new Date().getFullYear();

    const totalBudget = await budgetRepository.getBudgetTotalByMonth(
      userId,
      month,
      year,
    );
    const totalExpense = await transactionRepository.getExpenseTotalByMonth(
      userId,
      month,
      year,
    );
    const monthlyBalance = totalBudget - totalExpense;

    return baseResponse(res, true, 200, "Monthly balance computed", {
      month,
      year,
      total_budget: totalBudget,
      total_expense: totalExpense,
      monthly_balance: monthlyBalance,
    });
  } catch (error) {
    console.error("Error computing monthly balance:", error);
    return baseResponse(res, false, 500, "Internal server error", null);
  }
};
