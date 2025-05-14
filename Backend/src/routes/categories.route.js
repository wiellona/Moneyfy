const express = require("express");
const router = express.Router();
const categoriesController = require("../controllers/categories.controller");

// GET all categories
router.get("/", categoriesController.getAllCategories);

// GET category by ID
router.get("/:id", categoriesController.getCategoryById);

// GET categories by type (income/expense)
router.get("/type/:type", categoriesController.getCategoriesByType);

// POST create new category
router.post("/", categoriesController.createCategory);

// PUT update category
router.put("/:id", categoriesController.updateCategory);

// DELETE category
router.delete("/:id", categoriesController.deleteCategory);

module.exports = router;
