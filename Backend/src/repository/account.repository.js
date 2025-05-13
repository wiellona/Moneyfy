const db = require("../database/pg.database");

exports.createAccount = async (account) => {
  try {
    const res = await db.query(
      "INSERT INTO accounts (user_id, name, balance, type) VALUES ($1, $2, $3, $4) RETURNING *",
      [account.user_id, account.name, account.balance, account.type]
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
      "UPDATE accounts SET name = $1, balance = $2, type = $3, updated_at = CURRENT_TIMESTAMP WHERE account_id = $4 RETURNING *",
      [account.name, account.balance, account.type, accountId]
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
      [accountId]
    );
    return res.rows[0];
  } catch (error) {
    console.error("Error executing query", error);
    throw error;
  }
};
