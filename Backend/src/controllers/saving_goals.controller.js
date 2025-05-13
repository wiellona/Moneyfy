const savingGoalsRepository = require("../repository/saving_goals.repository");
const baseResponse = require("../utils/baseResponse.util");

exports.createSavingGoal = async (req, res) => {
  try {
    // Validate input
    if (
      !req.body.user_id ||
      !req.body.title ||
      !req.body.target_amount ||
      !req.body.start_date ||
      !req.body.end_date
    ) {
      return baseResponse(
        res,
        false,
        400,
        "All fields are required (user_id, title, target_amount, start_date, end_date)",
        null
      );
    }

    // Validate dates
    const startDate = new Date(req.body.start_date);
    const endDate = new Date(req.body.end_date);

    if (isNaN(startDate) || isNaN(endDate)) {
      return baseResponse(
        res,
        false,
        400,
        "Invalid date format. Use YYYY-MM-DD",
        null
      );
    }

    if (endDate <= startDate) {
      return baseResponse(
        res,
        false,
        400,
        "End date must be after start date",
        null
      );
    }

    // Create saving goal
    const savingGoal = await savingGoalsRepository.createSavingGoal(req.body);

    return baseResponse(
      res,
      true,
      201,
      "Saving goal created successfully",
      savingGoal
    );
  } catch (error) {
    console.error("Error creating saving goal:", error);
    return baseResponse(res, false, 500, "Internal server error", null);
  }
};

exports.getSavingGoalsByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;

    if (!userId) {
      return baseResponse(res, false, 400, "User ID is required", null);
    }

    const savingGoals = await savingGoalsRepository.getSavingGoalsByUserId(
      userId
    );

    return baseResponse(
      res,
      true,
      200,
      "Saving goals retrieved successfully",
      savingGoals
    );
  } catch (error) {
    console.error("Error getting saving goals:", error);
    return baseResponse(res, false, 500, "Internal server error", null);
  }
};

exports.getSavingGoalById = async (req, res) => {
  try {
    const goalId = req.params.goalId;

    if (!goalId) {
      return baseResponse(res, false, 400, "Goal ID is required", null);
    }

    const savingGoal = await savingGoalsRepository.getSavingGoalById(goalId);

    if (!savingGoal) {
      return baseResponse(res, false, 404, "Saving goal not found", null);
    }

    return baseResponse(
      res,
      true,
      200,
      "Saving goal retrieved successfully",
      savingGoal
    );
  } catch (error) {
    console.error("Error getting saving goal:", error);
    return baseResponse(res, false, 500, "Internal server error", null);
  }
};

exports.updateSavingGoal = async (req, res) => {
  try {
    const goalId = req.params.goalId;

    if (!goalId) {
      return baseResponse(res, false, 400, "Goal ID is required", null);
    }

    // Check if saving goal exists
    const existingGoal = await savingGoalsRepository.getSavingGoalById(goalId);

    if (!existingGoal) {
      return baseResponse(res, false, 404, "Saving goal not found", null);
    }

    // Validate end date if provided
    if (req.body.end_date) {
      const endDate = new Date(req.body.end_date);
      const startDate = new Date(existingGoal.start_date);

      if (isNaN(endDate)) {
        return baseResponse(
          res,
          false,
          400,
          "Invalid date format. Use YYYY-MM-DD",
          null
        );
      }

      if (endDate <= startDate) {
        return baseResponse(
          res,
          false,
          400,
          "End date must be after start date",
          null
        );
      }
    }

    // Update saving goal with provided fields or keep existing values
    const updatedGoalData = {
      title: req.body.title || existingGoal.title,
      target_amount: req.body.target_amount || existingGoal.target_amount,
      current_amount:
        req.body.current_amount !== undefined
          ? req.body.current_amount
          : existingGoal.current_amount,
      end_date: req.body.end_date || existingGoal.end_date,
    };

    const updatedGoal = await savingGoalsRepository.updateSavingGoal(
      goalId,
      updatedGoalData
    );

    return baseResponse(
      res,
      true,
      200,
      "Saving goal updated successfully",
      updatedGoal
    );
  } catch (error) {
    console.error("Error updating saving goal:", error);
    return baseResponse(res, false, 500, "Internal server error", null);
  }
};

exports.deleteSavingGoal = async (req, res) => {
  try {
    const goalId = req.params.goalId;

    if (!goalId) {
      return baseResponse(res, false, 400, "Goal ID is required", null);
    }

    // Check if saving goal exists
    const existingGoal = await savingGoalsRepository.getSavingGoalById(goalId);

    if (!existingGoal) {
      return baseResponse(res, false, 404, "Saving goal not found", null);
    }

    const deletedGoal = await savingGoalsRepository.deleteSavingGoal(goalId);

    return baseResponse(
      res,
      true,
      200,
      "Saving goal deleted successfully",
      deletedGoal
    );
  } catch (error) {
    console.error("Error deleting saving goal:", error);
    return baseResponse(res, false, 500, "Internal server error", null);
  }
};

exports.updateSavingGoalProgress = async (req, res) => {
  try {
    const goalId = req.params.goalId;
    const { amount } = req.body;

    if (!goalId) {
      return baseResponse(res, false, 400, "Goal ID is required", null);
    }

    if (amount === undefined) {
      return baseResponse(res, false, 400, "Amount is required", null);
    }

    // Check if saving goal exists
    const existingGoal = await savingGoalsRepository.getSavingGoalById(goalId);

    if (!existingGoal) {
      return baseResponse(res, false, 404, "Saving goal not found", null);
    }

    // Update the progress
    const updatedGoal = await savingGoalsRepository.updateSavingGoalProgress(
      goalId,
      amount
    );

    return baseResponse(
      res,
      true,
      200,
      "Saving goal progress updated successfully",
      updatedGoal
    );
  } catch (error) {
    console.error("Error updating saving goal progress:", error);
    return baseResponse(res, false, 500, "Internal server error", null);
  }
};
