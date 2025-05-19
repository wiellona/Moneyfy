const transactionRepository = require("../repository/transaction.repository");

// Get all transactions
const getAllTransactions = async (req, res) => {
  try {
    const transactions = await transactionRepository.getAllTransactions();
    res.status(200).json({
      success: true,
      data: transactions,
    });
  } catch (error) {
    console.error("Error getting all transactions:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve transactions",
    });
  }
};

// Get transaction by ID
const getTransactionById = async (req, res) => {
  try {
    const { id } = req.params;
    const transaction = await transactionRepository.getTransactionById(id);

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: "Transaction not found",
      });
    }

    res.status(200).json({
      success: true,
      data: transaction,
    });
  } catch (error) {
    console.error("Error getting transaction by id:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve transaction",
    });
  }
};

// Get transactions by user ID with improved time filtering
const getTransactionsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const { timeframe, startDate, endDate, month, year } = req.query;

    // Handle month and year filtering (specific month)
    if (month && year) {
      const monthNum = parseInt(month);
      const yearNum = parseInt(year);

      // Validate month and year
      if (isNaN(monthNum) || monthNum < 1 || monthNum > 12) {
        return res.status(400).json({
          success: false,
          message: "Month must be a number between 1 and 12",
        });
      }

      if (isNaN(yearNum) || yearNum < 2000 || yearNum > 2100) {
        return res.status(400).json({
          success: false,
          message: "Year must be a valid number",
        });
      }

      // Use getTransactionsByMonth without type filter
      const transactions = await transactionRepository.getTransactionsByMonth(
        userId,
        monthNum,
        yearNum
      );

      return res.status(200).json({
        success: true,
        data: transactions,
      });
    }

    // Handle date range filtering
    if (startDate || endDate) {
      // Validate both dates are provided
      if (!startDate || !endDate) {
        return res.status(400).json({
          success: false,
          message: "Both startDate and endDate must be provided",
        });
      }

      // Validate date format
      const start = new Date(startDate);
      const end = new Date(endDate);
      if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        return res.status(400).json({
          success: false,
          message: "Invalid date format",
        });
      }

      // Get transactions by date range
      const transactions = await transactionRepository.getTransactionsByUserId(
        userId,
        null, // No timeframe when using date range
        startDate,
        endDate
      );

      return res.status(200).json({
        success: true,
        data: transactions,
      });
    }

    // Handle timeframe filtering (this week, this month, this year)
    const validTimeframes = ["week", "month", "year"];
    if (timeframe && !validTimeframes.includes(timeframe)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid timeframe. Must be "week", "month", or "year"',
      });
    }

    const transactions = await transactionRepository.getTransactionsByUserId(
      userId,
      timeframe || "month" // Default to month if no timeframe specified
    );

    res.status(200).json({
      success: true,
      data: transactions,
    });
  } catch (error) {
    console.error("Error getting user transactions:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve transactions",
    });
  }
};

// Get transactions by type with improved time filtering
const getTransactionsByType = async (req, res) => {
  try {
    const { userId, type } = req.params;
    const { timeframe, startDate, endDate, month, year } = req.query;

    // Validate transaction type
    if (type !== "income" && type !== "expense" && type !== "saving") {
      return res.status(400).json({
        success: false,
        message:
          'Invalid transaction type. Type must be "income", "expense", or "saving"',
      });
    }

    // Handle month and year filtering (specific month)
    if (month && year) {
      const monthNum = parseInt(month);
      const yearNum = parseInt(year);

      // Validate month and year
      if (isNaN(monthNum) || monthNum < 1 || monthNum > 12) {
        return res.status(400).json({
          success: false,
          message: "Month must be a number between 1 and 12",
        });
      }

      if (isNaN(yearNum) || yearNum < 2000 || yearNum > 2100) {
        return res.status(400).json({
          success: false,
          message: "Year must be a valid number",
        });
      }

      // Use getTransactionsByMonth with type filter
      const transactions = await transactionRepository.getTransactionsByMonth(
        userId,
        monthNum,
        yearNum,
        type
      );

      return res.status(200).json({
        success: true,
        data: transactions,
      });
    }

    // Handle date range filtering
    if (startDate || endDate) {
      // Validate both dates are provided
      if (!startDate || !endDate) {
        return res.status(400).json({
          success: false,
          message: "Both startDate and endDate must be provided",
        });
      }

      // Validate date format
      const start = new Date(startDate);
      const end = new Date(endDate);
      if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        return res.status(400).json({
          success: false,
          message: "Invalid date format",
        });
      }

      // Get transactions by type and date range
      const transactions = await transactionRepository.getTransactionsByType(
        userId,
        type,
        null, // No timeframe when using date range
        startDate,
        endDate
      );

      return res.status(200).json({
        success: true,
        data: transactions,
      });
    }

    // Handle timeframe filtering (this week, this month, this year)
    const validTimeframes = ["week", "month", "year"];
    if (timeframe && !validTimeframes.includes(timeframe)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid timeframe. Must be "week", "month", or "year"',
      });
    }

    const transactions = await transactionRepository.getTransactionsByType(
      userId,
      type,
      timeframe || "month" // Default to month if no timeframe specified
    );

    res.status(200).json({
      success: true,
      data: transactions,
    });
  } catch (error) {
    console.error("Error getting transactions by type:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve transactions",
    });
  }
};

// Create transaction
const createTransaction = async (req, res) => {
  try {
    const { userId, categoryId, amount, date, note, transactionType, goalId } =
      req.body;

    // Validate required fields
    if (!userId || !categoryId || !amount || !date || !transactionType) {
      return res.status(400).json({
        success: false,
        message:
          "User ID, category ID, amount, date, and transaction type are required",
      });
    }

    // Validate transaction type
    if (
      transactionType !== "income" &&
      transactionType !== "expense" &&
      transactionType !== "saving"
    ) {
      return res.status(400).json({
        success: false,
        message:
          'Invalid transaction type. Type must be "income", "expense", or "saving"',
      });
    }

    // Validate amount
    if (isNaN(amount) || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Amount must be a positive number",
      });
    }

    const newTransaction = await transactionRepository.createTransaction(
      userId,
      categoryId,
      amount,
      date,
      note || "",
      transactionType,
      goalId
    );

    res.status(201).json({
      success: true,
      data: newTransaction,
    });
  } catch (error) {
    console.error("Error creating transaction:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create transaction",
    });
  }
};

// Update transaction
const updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const { categoryId, amount, date, note, transactionType, goalId } =
      req.body;

    // Check if transaction exists
    const existingTransaction = await transactionRepository.getTransactionById(
      id
    );
    if (!existingTransaction) {
      return res.status(404).json({
        success: false,
        message: "Transaction not found",
      });
    }

    // Validate transaction type if provided
    if (
      transactionType &&
      transactionType !== "income" &&
      transactionType !== "expense" &&
      transactionType !== "saving"
    ) {
      return res.status(400).json({
        success: false,
        message:
          'Invalid transaction type. Type must be "income", "expense", or "saving"',
      });
    }

    // Validate amount if provided
    if (amount !== undefined && (isNaN(amount) || amount <= 0)) {
      return res.status(400).json({
        success: false,
        message: "Amount must be a positive number",
      });
    }

    const updatedTransaction = await transactionRepository.updateTransaction(
      id,
      categoryId || existingTransaction.category_id,
      amount !== undefined ? amount : existingTransaction.amount,
      date || existingTransaction.date,
      note !== undefined ? note : existingTransaction.note,
      transactionType || existingTransaction.transaction_type,
      goalId !== undefined ? goalId : existingTransaction.goal_id
    );

    res.status(200).json({
      success: true,
      data: updatedTransaction,
    });
  } catch (error) {
    console.error("Error updating transaction:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update transaction",
    });
  }
};

// Delete transaction
const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if transaction exists
    const existingTransaction = await transactionRepository.getTransactionById(
      id
    );
    if (!existingTransaction) {
      return res.status(404).json({
        success: false,
        message: "Transaction not found",
      });
    }

    await transactionRepository.deleteTransaction(id);

    res.status(200).json({
      success: true,
      message: "Transaction deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting transaction:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete transaction",
    });
  }
};

// Get transaction summary
const getTransactionSummary = async (req, res) => {
  try {
    const { userId } = req.params;
    const { period } = req.query;

    const summary = await transactionRepository.getTransactionSummary(
      userId,
      period
    );

    res.status(200).json({
      success: true,
      data: summary,
    });
  } catch (error) {
    console.error("Error getting transaction summary:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve transaction summary",
    });
  }
};

// Get income vs expenses for the past months
const getIncomeVsExpenses = async (req, res) => {
  try {
    const userId = req.params.userId;
    // Get year from query params, default to current year if not provided
    const year = req.query.year
      ? parseInt(req.query.year)
      : new Date().getFullYear();

    if (!userId) {
      return baseResponse(res, false, 400, "User ID is required", null);
    }

    const incomeVsExpensesData =
      await transactionRepository.getIncomeVsExpenses(userId, year);

    return res.status(200).json({
      success: true,
      data: incomeVsExpensesData,
    });
  } catch (error) {
    console.error("Error in getIncomeVsExpenses controller:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve income vs expenses data",
    });
  }
};

module.exports = {
  getAllTransactions,
  getTransactionById,
  getTransactionsByUserId,
  getTransactionsByType,
  createTransaction,
  updateTransaction,
  deleteTransaction,
  getTransactionSummary,
  getIncomeVsExpenses,
};
