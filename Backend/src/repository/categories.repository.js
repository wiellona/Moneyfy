const { query } = require("../database/pg.database");
const { v4: uuidv4 } = require("uuid");

const getAllCategories = async () => {
  const result = await query("SELECT * FROM categories ORDER BY name");
  return result.rows;
};

const getCategoryById = async (categoryId) => {
  const result = await query(
    "SELECT * FROM categories WHERE category_id = $1",
    [categoryId]
  );
  return result.rows[0];
};

const getCategoriesByType = async (type) => {
  const result = await query(
    "SELECT * FROM categories WHERE type = $1 ORDER BY name",
    [type]
  );
  return result.rows;
};

const createCategory = async (name, type, iconUrl) => {
  const categoryId = uuidv4();
  const now = new Date();

  const result = await query(
    "INSERT INTO categories (category_id, name, type, icon_url, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
    [categoryId, name, type, iconUrl, now, now]
  );

  return result.rows[0];
};

const updateCategory = async (categoryId, name, type, iconUrl) => {
  const now = new Date();

  const result = await query(
    "UPDATE categories SET name = $1, type = $2, icon_url = $3, updated_at = $4 WHERE category_id = $5 RETURNING *",
    [name, type, iconUrl, now, categoryId]
  );

  return result.rows[0];
};

const deleteCategory = async (categoryId) => {
  const result = await query(
    "DELETE FROM categories WHERE category_id = $1 RETURNING *",
    [categoryId]
  );
  return result.rows[0];
};

module.exports = {
  getAllCategories,
  getCategoryById,
  getCategoriesByType,
  createCategory,
  updateCategory,
  deleteCategory,
};
