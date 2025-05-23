const budgetRepository = require("../repository/budget.repository");
const categoriesRepository = require("../repository/categories.repository");

// Get all budgets
const getAllBudgets = async (req, res) => {
  try {
    const budgets = await budgetRepository.getAllBudgets();
    res.status(200).json({
      success: true,
      data: budgets,
    });
  } catch (error) {
    console.error("Error getting all budgets:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve budgets",
    });
  }
};

// Get budget by ID
const getBudgetById = async (req, res) => {
  try {
    const { id } = req.params;
    const budget = await budgetRepository.getBudgetById(id);

    if (!budget) {
      return res.status(404).json({
        success: false,
        message: "Budget not found",
      });
    }

    res.status(200).json({
      success: true,
      data: budget,
    });
  } catch (error) {
    console.error("Error getting budget by id:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve budget",
    });
  }
};

// Get budgets by user ID
const getBudgetsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const { timeframe, startDate, endDate, month, year } = req.query;

    // Get budgets by specific month and year if provided
    if (month && year) {
      const monthNum = parseInt(month);
      const yearNum = parseInt(year);

      // Validate month (1-12)
      if (isNaN(monthNum) || monthNum < 1 || monthNum > 12) {
        return res.status(400).json({
          success: false,
          message: "Month must be a number between 1 and 12",
        });
      }

      // Validate year
      if (isNaN(yearNum) || yearNum < 2000 || yearNum > 2100) {
        return res.status(400).json({
          success: false,
          message: "Year must be a valid number",
        });
      }

      const budgets = await budgetRepository.getBudgetsByMonth(
        userId,
        monthNum,
        yearNum
      );

      return res.status(200).json({
        success: true,
        data: budgets,
      });
    }

    // Handle date range filtering
    if (startDate && endDate) {
      const budgets = await budgetRepository.getBudgetsByDateRange(
        userId,
        startDate,
        endDate
      );

      return res.status(200).json({
        success: true,
        data: budgets,
      });
    }

    // Handle timeframe filtering
    if (timeframe) {
      const budgets = await budgetRepository.getBudgetsByTimePeriod(
        userId,
        timeframe
      );

      return res.status(200).json({
        success: true,
        data: budgets,
      });
    }

    // Get all budgets if no filters provided
    const budgets = await budgetRepository.getBudgetsByUserId(userId);

    res.status(200).json({
      success: true,
      data: budgets,
    });
  } catch (error) {
    console.error("Error getting user budgets:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve budgets",
    });
  }
};

// Get active budgets by user ID
const getActiveBudgetsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const budgets = await budgetRepository.getActiveBudgetsByUserId(userId);

    res.status(200).json({
      success: true,
      data: budgets,
    });
  } catch (error) {
    console.error("Error getting active budgets:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve active budgets",
    });
  }
};

// Get budget progress
const getBudgetProgress = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if budget exists
    const budget = await budgetRepository.getBudgetById(id);
    if (!budget) {
      return res.status(404).json({
        success: false,
        message: "Budget not found",
      });
    }

    const progress = await budgetRepository.getBudgetProgress(id);

    res.status(200).json({
      success: true,
      data: progress,
    });
  } catch (error) {
    console.error("Error getting budget progress:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve budget progress",
    });
  }
};

// Create budget
const createBudget = async (req, res) => {
  try {
    const { userId, categoryId, amount, startDate, endDate } = req.body;

    // Validate required fields
    if (!userId || !categoryId || !amount || !startDate || !endDate) {
      return res.status(400).json({
        success: false,
        message:
          "User ID, category ID, amount, start date, and end date are required",
      });
    }

    // Validate amount
    if (isNaN(amount) || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Amount must be a positive number",
      });
    }

    // Validate dates
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return res.status(400).json({
        success: false,
        message: "Invalid date format",
      });
    }

    if (end < start) {
      return res.status(400).json({
        success: false,
        message: "End date must be after start date",
      });
    }

    // Check if category exists and is of type expense
    const category = await categoriesRepository.getCategoryById(categoryId);

    if (!category) {
      return res.status(400).json({
        success: false,
        message: "Category not found",
      });
    }

    if (category.type !== "expense") {
      return res.status(400).json({
        success: false,
        message: "Budgets can only be set for expense categories",
      });
    }

    const newBudget = await budgetRepository.createBudget(
      userId,
      categoryId,
      amount,
      startDate,
      endDate
    );

    res.status(201).json({
      success: true,
      data: newBudget,
    });
  } catch (error) {
    console.error("Error creating budget:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create budget",
    });
  }
};

// Update budget
const updateBudget = async (req, res) => {
  try {
    const { id } = req.params;
    const { categoryId, amount, startDate, endDate } = req.body;

    // Check if budget exists
    const existingBudget = await budgetRepository.getBudgetById(id);
    if (!existingBudget) {
      return res.status(404).json({
        success: false,
        message: "Budget not found",
      });
    }

    // Validate amount if provided
    if (amount !== undefined && (isNaN(amount) || amount <= 0)) {
      return res.status(400).json({
        success: false,
        message: "Amount must be a positive number",
      });
    }

    // Prepare final values, using existing values if not provided
    const finalCategoryId = categoryId || existingBudget.category_id;
    const finalAmount = amount !== undefined ? amount : existingBudget.amount;
    const finalStartDate = startDate || existingBudget.start_date;
    const finalEndDate = endDate || existingBudget.end_date;

    // Validate dates if changed
    if (startDate || endDate) {
      const start = new Date(finalStartDate);
      const end = new Date(finalEndDate);

      if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        return res.status(400).json({
          success: false,
          message: "Invalid date format",
        });
      }

      if (end < start) {
        return res.status(400).json({
          success: false,
          message: "End date must be after start date",
        });
      }
    }

    // Check category if changed
    if (categoryId && categoryId !== existingBudget.category_id) {
      const category = await categoriesRepository.getCategoryById(
        finalCategoryId
      );

      if (!category) {
        return res.status(400).json({
          success: false,
          message: "Category not found",
        });
      }

      if (category.type !== "expense") {
        return res.status(400).json({
          success: false,
          message: "Budgets can only be set for expense categories",
        });
      }
    }

    const updatedBudget = await budgetRepository.updateBudget(
      id,
      finalCategoryId,
      finalAmount,
      finalStartDate,
      finalEndDate
    );

    res.status(200).json({
      success: true,
      data: updatedBudget,
    });
  } catch (error) {
    console.error("Error updating budget:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update budget",
    });
  }
};

// Get budgets by category
const getBudgetsByCategory = async (req, res) => {
  try {
    const { userId, categoryId } = req.params;
    const { timeframe, startDate, endDate, month, year } = req.query;

    // Validate that category exists
    const category = await categoriesRepository.getCategoryById(categoryId);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    // Get budgets by specific month and year if provided
    if (month && year) {
      const monthNum = parseInt(month);
      const yearNum = parseInt(year);

      // Validate month & year
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

      // First get all budgets for the month/year
      const allBudgets = await budgetRepository.getBudgetsByMonth(
        userId,
        monthNum,
        yearNum
      );
      // Then filter by category
      const budgets = allBudgets.filter(
        (budget) => budget.category_id === categoryId
      );

      return res.status(200).json({
        success: true,
        data: budgets,
      });
    }

    // Handle date range and timeframe
    let budgets;
    if (startDate && endDate) {
      budgets = await budgetRepository.getBudgetsByCategory(
        userId,
        categoryId,
        null,
        startDate,
        endDate
      );
    } else {
      budgets = await budgetRepository.getBudgetsByCategory(
        userId,
        categoryId,
        timeframe
      );
    }

    res.status(200).json({
      success: true,
      data: budgets,
    });
  } catch (error) {
    console.error("Error getting category budgets:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve budgets",
    });
  }
};

// Delete budget
const deleteBudget = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if budget exists
    const existingBudget = await budgetRepository.getBudgetById(id);
    if (!existingBudget) {
      return res.status(404).json({
        success: false,
        message: "Budget not found",
      });
    }

    await budgetRepository.deleteBudget(id);

    res.status(200).json({
      success: true,
      message: "Budget deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting budget:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete budget",
    });
  }
};

const getBudgetProgressByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const { timeframe, month, year } = req.query;

    // If month and year are provided, use them for filtering
    let budgets;
    if (month && year) {
      const monthNum = parseInt(month);
      const yearNum = parseInt(year);

      // Validate month (1-12)
      if (isNaN(monthNum) || monthNum < 1 || monthNum > 12) {
        return res.status(400).json({
          success: false,
          message: "Month must be a number between 1 and 12",
        });
      }

      // Validate year
      if (isNaN(yearNum) || yearNum < 2000 || yearNum > 2100) {
        return res.status(400).json({
          success: false,
          message: "Year must be a valid number",
        });
      }

      budgets = await budgetRepository.getBudgetProgressByUserIdAndMonth(
        userId,
        monthNum,
        yearNum
      );
    } else {
      // Fall back to timeframe if month and year aren't provided
      budgets = await budgetRepository.getBudgetProgressByUserId(
        userId,
        timeframe
      );
    }

    res.status(200).json({
      success: true,
      data: budgets,
    });
  } catch (error) {
    console.error("Error getting budgets by user ID:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve budgets",
    });
  }
};

module.exports = {
  getAllBudgets,
  getBudgetById,
  getBudgetsByUserId,
  getActiveBudgetsByUserId,
  getBudgetProgress,
  createBudget,
  updateBudget,
  deleteBudget,
  getBudgetsByCategory,
  getBudgetProgressByUserId,
};
