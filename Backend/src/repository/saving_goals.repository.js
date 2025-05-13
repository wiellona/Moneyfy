const db = require("../database/pg.database");

exports.createSavingGoal = async (savingGoal) => {
  try {
    const res = await db.query(
      "INSERT INTO savinggoals (user_id, title, target_amount, current_amount, start_date, end_date) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [
        savingGoal.user_id,
        savingGoal.title,
        savingGoal.target_amount,
        savingGoal.current_amount || 0,
        savingGoal.start_date,
        savingGoal.end_date,
      ]
    );
    return res.rows[0];
  } catch (error) {
    console.error("Error executing query", error);
    throw error;
  }
};

exports.getSavingGoalsByUserId = async (userId) => {
  try {
    const res = await db.query("SELECT * FROM savinggoals WHERE user_id = $1", [
      userId,
    ]);
    return res.rows;
  } catch (error) {
    console.error("Error executing query", error);
    throw error;
  }
};

exports.getSavingGoalById = async (goalId) => {
  try {
    const res = await db.query("SELECT * FROM savinggoals WHERE goal_id = $1", [
      goalId,
    ]);
    return res.rows[0];
  } catch (error) {
    console.error("Error executing query", error);
    throw error;
  }
};

exports.updateSavingGoal = async (goalId, savingGoal) => {
  try {
    const res = await db.query(
      "UPDATE savinggoals SET title = $1, target_amount = $2, current_amount = $3, end_date = $4, updated_at = CURRENT_TIMESTAMP WHERE goal_id = $5 RETURNING *",
      [
        savingGoal.title,
        savingGoal.target_amount,
        savingGoal.current_amount,
        savingGoal.end_date,
        goalId,
      ]
    );
    return res.rows[0];
  } catch (error) {
    console.error("Error executing query", error);
    throw error;
  }
};

exports.deleteSavingGoal = async (goalId) => {
  try {
    const res = await db.query(
      "DELETE FROM savinggoals WHERE goal_id = $1 RETURNING *",
      [goalId]
    );
    return res.rows[0];
  } catch (error) {
    console.error("Error executing query", error);
    throw error;
  }
};

exports.updateSavingGoalProgress = async (goalId, amount) => {
  try {
    const res = await db.query(
      "UPDATE savinggoals SET current_amount = current_amount + $1, updated_at = CURRENT_TIMESTAMP WHERE goal_id = $2 RETURNING *",
      [amount, goalId]
    );
    return res.rows[0];
  } catch (error) {
    console.error("Error executing query", error);
    throw error;
  }
};
