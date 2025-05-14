const { query } = require("../database/pg.database");
const { v4: uuidv4 } = require("uuid");

const getDateFilterClause = (timeframe) => {
  switch (timeframe) {
    case "week":
      return "date >= CURRENT_DATE - INTERVAL '7 days'";
    case "month":
      return "date >= DATE_TRUNC('month', CURRENT_DATE)";
    case "year":
      return "date >= DATE_TRUNC('year', CURRENT_DATE)";
    default:
      return "TRUE"; // No time filter by default
  }
};

// Get all transactions
const getAllTransactions = async () => {
  const result = await query(`
    SELECT t.*, c.name as category_name, c.type as category_type 
    FROM transactions t
    LEFT JOIN categories c ON t.category_id = c.category_id
    ORDER BY t.date DESC
  `);
  return result.rows;
};

// Get transaction by ID
const getTransactionById = async (transactionId) => {
  const result = await query(
    `SELECT t.*, c.name as category_name, c.type as category_type 
     FROM transactions t
     LEFT JOIN categories c ON t.category_id = c.category_id
     WHERE t.transaction_id = $1`,
    [transactionId]
  );
  return result.rows[0];
};

// Get transactions by user ID
const getTransactionsByUserId = async (
  userId,
  timeframe = null,
  startDate = null,
  endDate = null
) => {
  let dateFilter = "TRUE";
  const params = [userId];

  if (startDate && endDate) {
    dateFilter = "date BETWEEN $2 AND $3";
    params.push(startDate, endDate);
  } else if (timeframe) {
    dateFilter = getDateFilterClause(timeframe);
  }

  const result = await query(
    `SELECT t.*, c.name as category_name, c.type as category_type, c.icon_url as category_icon 
     FROM transactions t
     LEFT JOIN categories c ON t.category_id = c.category_id
     WHERE t.user_id = $1 AND ${dateFilter}
     ORDER BY t.date DESC`,
    params
  );
  return result.rows;
};

// Get transactions by type
const getTransactionsByType = async (
  userId,
  type,
  timeframe = null,
  startDate = null,
  endDate = null
) => {
  let dateFilter = "TRUE";
  const params = [userId, type];

  if (startDate && endDate) {
    dateFilter = "date BETWEEN $3 AND $4";
    params.push(startDate, endDate);
  } else if (timeframe) {
    dateFilter = getDateFilterClause(timeframe);
  }

  const result = await query(
    `SELECT t.*, c.name as category_name, c.type as category_type, c.icon_url as category_icon 
     FROM transactions t
     LEFT JOIN categories c ON t.category_id = c.category_id
     WHERE t.user_id = $1 AND t.transaction_type = $2 AND ${dateFilter}
     ORDER BY t.date DESC`,
    params
  );
  return result.rows;
};

// Create transaction
const createTransaction = async (
  userId,
  categoryId,
  amount,
  date,
  note,
  transactionType,
  goalId = null
) => {
  try {
    const transactionId = uuidv4();
    const now = new Date();

    console.log("Creating transaction with:", {
      userId,
      categoryId,
      amount,
      date,
      transactionType,
    });

    const result = await query(
      `INSERT INTO transactions
       (transaction_id, user_id, category_id, amount, date, note, transaction_type, goal_id, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
       RETURNING *`,
      [
        transactionId,
        userId,
        categoryId,
        amount,
        date,
        note,
        transactionType,
        goalId,
        now,
        now,
      ]
    );

    console.log("Transaction creation result:", result);
    return result.rows[0];
  } catch (error) {
    console.error("Detailed transaction creation error:", error);
    throw error;
  }
};

// Update transaction
const updateTransaction = async (
  transactionId,
  categoryId,
  amount,
  date,
  note,
  transactionType,
  goalId = null
) => {
  const now = new Date();

  const result = await query(
    `UPDATE transactions
     SET category_id = $1, amount = $2, date = $3, note = $4, transaction_type = $5, 
     goal_id = $6, updated_at = $7
     WHERE transaction_id = $8
     RETURNING *`,
    [
      categoryId,
      amount,
      date,
      note,
      transactionType,
      goalId,
      now,
      transactionId,
    ]
  );

  return result.rows[0];
};

// Delete transaction
const deleteTransaction = async (transactionId) => {
  const result = await query(
    "DELETE FROM transactions WHERE transaction_id = $1 RETURNING *",
    [transactionId]
  );
  return result.rows[0];
};

// Get summary data (for dashboard)
const getTransactionSummary = async (userId, period = "month") => {
  let dateFilter;

  switch (period) {
    case "week":
      dateFilter = "date >= CURRENT_DATE - INTERVAL '7 days'";
      break;
    case "month":
      dateFilter = "date >= DATE_TRUNC('month', CURRENT_DATE)";
      break;
    case "year":
      dateFilter = "date >= DATE_TRUNC('year', CURRENT_DATE)";
      break;
    default:
      dateFilter = "date >= DATE_TRUNC('month', CURRENT_DATE)";
  }

  const result = await query(
    `SELECT 
       SUM(CASE WHEN transaction_type = 'income' THEN amount ELSE 0 END) as total_income,
       SUM(CASE WHEN transaction_type = 'expense' THEN amount ELSE 0 END) as total_expense,
       SUM(CASE WHEN transaction_type = 'saving' THEN amount ELSE 0 END) as total_saving
     FROM transactions
     WHERE user_id = $1 AND ${dateFilter}`,
    [userId]
  );

  return result.rows[0];
};

// Get transactions by month and year
const getTransactionsByMonth = async (userId, month, year, type = null) => {
  const params = [userId, month, year];
  let typeFilter = "";

  if (type) {
    typeFilter = "AND t.transaction_type = $4";
    params.push(type);
  }

  const result = await query(
    `SELECT t.*, c.name as category_name, c.type as category_type, c.icon_url as category_icon 
     FROM transactions t
     LEFT JOIN categories c ON t.category_id = c.category_id
     WHERE t.user_id = $1 
     AND EXTRACT(MONTH FROM t.date) = $2
     AND EXTRACT(YEAR FROM t.date) = $3
     ${typeFilter}
     ORDER BY t.date DESC`,
    params
  );
  return result.rows;
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
  getTransactionsByMonth,
};
