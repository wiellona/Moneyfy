const db = require("../database/pg.database");

exports.createAccount = async (account) => {
  try {
    const res = await db.query(
      "INSERT INTO accounts (user_id, name, total_savings, type) VALUES ($1, $2, $3, $4) RETURNING *",
      [account.user_id, account.name, account.total_savings ?? 0, account.type],
    );
    return res.rows[0];
  } catch (error) {
    console.error("Error executing query", error);
    throw error;
  }
};

exports.getAccountsByUserId = async (userId) => {
  try {
    const res = await db.query("SELECT * FROM accounts WHERE user_id = $1", [
      userId,
    ]);
    return res.rows;
  } catch (error) {
    console.error("Error executing query", error);
    throw error;
  }
};

exports.getAccountById = async (accountId) => {
  try {
    const res = await db.query("SELECT * FROM accounts WHERE account_id = $1", [
      accountId,
    ]);
    return res.rows[0];
  } catch (error) {
    console.error("Error executing query", error);
    throw error;
  }
};

exports.updateAccount = async (accountId, account) => {
  try {
    const res = await db.query(
      "UPDATE accounts SET name = $1, total_savings = $2, type = $3, updated_at = CURRENT_TIMESTAMP WHERE account_id = $4 RETURNING *",
      [account.name, account.total_savings, account.type, accountId],
    );
    return res.rows[0];
  } catch (error) {
    console.error("Error executing query", error);
    throw error;
  }
};

exports.deleteAccount = async (accountId) => {
  try {
    const res = await db.query(
      "DELETE FROM accounts WHERE account_id = $1 RETURNING *",
      [accountId],
    );
    return res.rows[0];
  } catch (error) {
    console.error("Error executing query", error);
    throw error;
  }
};

exports.incrementTotalSavingsByUserId = async (userId, amount) => {
  try {
    const res = await db.query(
      "UPDATE accounts SET total_savings = total_savings + $1, updated_at = CURRENT_TIMESTAMP WHERE user_id = $2 RETURNING total_savings",
      [amount, userId],
    );
    return res.rows[0]?.total_savings ?? 0;
  } catch (error) {
    console.error("Error executing query", error);
    throw error;
  }
};

exports.getTotalSavingsByUserId = async (userId) => {
  try {
    const res = await db.query(
      `SELECT COALESCE(SUM(total_savings), 0) AS total_savings 
         FROM accounts WHERE user_id = $1`,
      [userId],
    );
    return res.rows[0];
  } catch (error) {
    console.error("Error executing query", error);
    throw error;
  }
};

exports.getDistinctUserIds = async () => {
  const res = await db.query("SELECT DISTINCT user_id FROM accounts");
  return res.rows;
};
