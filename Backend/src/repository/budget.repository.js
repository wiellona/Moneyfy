const { query } = require("../database/pg.database");
const { v4: uuidv4 } = require("uuid");

// Get budgets by time period
const getBudgetsByTimePeriod = async (userId, timeframe) => {
  let dateFilter;

  switch (timeframe) {
    case "week":
      dateFilter = "start_date >= CURRENT_DATE - INTERVAL '7 days'";
      break;
    case "month":
      dateFilter = "start_date >= DATE_TRUNC('month', CURRENT_DATE)";
      break;
    case "year":
      dateFilter = "start_date >= DATE_TRUNC('year', CURRENT_DATE)";
      break;
    default:
      dateFilter = "TRUE"; // No time filter by default
  }

  const result = await query(
    `SELECT b.*, c.name as category_name, c.type as category_type 
     FROM budgets b
     LEFT JOIN categories c ON b.category_id = c.category_id
     WHERE b.user_id = $1 AND ${dateFilter}
     ORDER BY b.start_date DESC`,
    [userId]
  );

  return result.rows;
};

// Get budgets by date range
const getBudgetsByDateRange = async (userId, startDate, endDate) => {
  const result = await query(
    `SELECT b.*, c.name as category_name, c.type as category_type 
     FROM budgets b
     LEFT JOIN categories c ON b.category_id = c.category_id
     WHERE b.user_id = $1 
     AND (
       (b.start_date BETWEEN $2 AND $3) OR
       (b.end_date BETWEEN $2 AND $3) OR
       (b.start_date <= $2 AND b.end_date >= $3)
     )
     ORDER BY b.start_date DESC`,
    [userId, startDate, endDate]
  );

  return result.rows;
};

// Get budgets by month and year
const getBudgetsByMonth = async (userId, month, year) => {
  const result = await query(
    `SELECT b.*, c.name as category_name, c.type as category_type 
     FROM budgets b
     LEFT JOIN categories c ON b.category_id = c.category_id
     WHERE b.user_id = $1 
     AND (
       (EXTRACT(MONTH FROM b.start_date) = $2 AND EXTRACT(YEAR FROM b.start_date) = $3) OR
       (EXTRACT(MONTH FROM b.end_date) = $2 AND EXTRACT(YEAR FROM b.end_date) = $3) OR
       (b.start_date <= make_date($3, $2, 1) AND 
        b.end_date >= (make_date($3, $2, 1) + INTERVAL '1 month - 1 day')::date)
     )
     ORDER BY b.start_date DESC`,
    [userId, month, year]
  );

  return result.rows;
};

// Get all budgets
const getAllBudgets = async () => {
  const result = await query(`
    SELECT b.*, c.name as category_name, c.type as category_type 
    FROM budgets b
    LEFT JOIN categories c ON b.category_id = c.category_id
    ORDER BY b.start_date DESC
  `);
  return result.rows;
};

// Get budget by ID
const getBudgetById = async (budgetId) => {
  const result = await query(
    `SELECT b.*, c.name as category_name, c.type as category_type 
     FROM budgets b
     LEFT JOIN categories c ON b.category_id = c.category_id
     WHERE b.budget_id = $1`,
    [budgetId]
  );
  return result.rows[0];
};

// Get budgets by user ID
const getBudgetsByUserId = async (userId) => {
  const result = await query(
    `SELECT b.*, c.name as category_name, c.type as category_type 
     FROM budgets b
     LEFT JOIN categories c ON b.category_id = c.category_id
     WHERE b.user_id = $1
     ORDER BY b.start_date DESC`,
    [userId]
  );
  return result.rows;
};

// Get active budgets by user ID (current date falls between start_date and end_date)
const getActiveBudgetsByUserId = async (userId) => {
  const result = await query(
    `SELECT b.*, c.name as category_name, c.type as category_type 
     FROM budgets b
     LEFT JOIN categories c ON b.category_id = c.category_id
     WHERE b.user_id = $1 
     AND CURRENT_DATE BETWEEN b.start_date AND b.end_date
     ORDER BY b.end_date ASC`,
    [userId]
  );
  return result.rows;
};

// Get budget progress (compare with actual spending)
const getBudgetProgress = async (budgetId) => {
  const result = await query(
    `SELECT b.budget_id, b.amount as budget_amount, 
            COALESCE(SUM(t.amount), 0) as spent_amount,
            b.amount - COALESCE(SUM(t.amount), 0) as remaining_amount,
            CASE 
              WHEN b.amount = 0 THEN 0
              ELSE ROUND((COALESCE(SUM(t.amount), 0) * 100.0 / b.amount))
            END as percentage_used
     FROM budgets b
     LEFT JOIN transactions t ON 
        b.user_id = t.user_id AND
        b.category_id = t.category_id AND
        t.date BETWEEN b.start_date AND b.end_date AND
        t.transaction_type = 'expense'
     WHERE b.budget_id = $1
     GROUP BY b.budget_id, b.amount`,
    [budgetId]
  );
  return result.rows[0];
};

// Create budget
const createBudget = async (userId, categoryId, amount, startDate, endDate) => {
  const budgetId = uuidv4();
  const now = new Date();

  const result = await query(
    `INSERT INTO budgets
     (budget_id, user_id, category_id, amount, start_date, end_date, created_at, updated_at)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
     RETURNING *`,
    [budgetId, userId, categoryId, amount, startDate, endDate, now, now]
  );

  return result.rows[0];
};

// Update budget
const updateBudget = async (
  budgetId,
  categoryId,
  amount,
  startDate,
  endDate
) => {
  const now = new Date();

  const result = await query(
    `UPDATE budgets
     SET category_id = $1, amount = $2, start_date = $3, end_date = $4, updated_at = $5
     WHERE budget_id = $6
     RETURNING *`,
    [categoryId, amount, startDate, endDate, now, budgetId]
  );

  return result.rows[0];
};

// Get budgets by category with time filtering
const getBudgetsByCategory = async (
  userId,
  categoryId,
  timeframe = null,
  startDate = null,
  endDate = null
) => {
  let queryText;
  let params;

  if (startDate && endDate) {
    queryText = `
      SELECT b.*, c.name as category_name, c.type as category_type 
      FROM budgets b
      LEFT JOIN categories c ON b.category_id = c.category_id
      WHERE b.user_id = $1 AND b.category_id = $2
      AND (
        (b.start_date BETWEEN $3 AND $4) OR
        (b.end_date BETWEEN $3 AND $4) OR
        (b.start_date <= $3 AND b.end_date >= $4)
      )
      ORDER BY b.start_date DESC
    `;
    params = [userId, categoryId, startDate, endDate];
  } else {
    let dateFilter;

    switch (timeframe) {
      case "week":
        dateFilter = "start_date >= CURRENT_DATE - INTERVAL '7 days'";
        break;
      case "month":
        dateFilter = "start_date >= DATE_TRUNC('month', CURRENT_DATE)";
        break;
      case "year":
        dateFilter = "start_date >= DATE_TRUNC('year', CURRENT_DATE)";
        break;
      default:
        dateFilter = "TRUE"; // No time filter by default
    }

    queryText = `
      SELECT b.*, c.name as category_name, c.type as category_type 
      FROM budgets b
      LEFT JOIN categories c ON b.category_id = c.category_id
      WHERE b.user_id = $1 AND b.category_id = $2 AND ${dateFilter}
      ORDER BY b.start_date DESC
    `;
    params = [userId, categoryId];
  }

  const result = await query(queryText, params);
  return result.rows;
};

// Delete budget
const deleteBudget = async (budgetId) => {
  const result = await query(
    "DELETE FROM budgets WHERE budget_id = $1 RETURNING *",
    [budgetId]
  );
  return result.rows[0];
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
  getBudgetsByTimePeriod,
  getBudgetsByDateRange,
  getBudgetsByMonth,
  getBudgetsByCategory,
};
