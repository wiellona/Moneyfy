const categoriesRepository = require("../repository/categories.repository");

// Get all categories
const getAllCategories = async (req, res) => {
  try {
    const categories = await categoriesRepository.getAllCategories();
    res.status(200).json({
      success: true,
      data: categories,
    });
  } catch (error) {
    console.error("Error getting all categories:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve categories",
    });
  }
};

// Get category by ID
const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await categoriesRepository.getCategoryById(id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    res.status(200).json({
      success: true,
      data: category,
    });
  } catch (error) {
    console.error("Error getting category by id:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve category",
    });
  }
};

// Get categories by type
const getCategoriesByType = async (req, res) => {
  try {
    const { type } = req.params;

    // Validate category type
    if (type !== "income" && type !== "expense" && type !== "saving") {
      return res.status(400).json({
        success: false,
        message:
          'Invalid category type. Type must be "income", "saving", or "expense"',
      });
    }

    const categories = await categoriesRepository.getCategoriesByType(type);

    res.status(200).json({
      success: true,
      data: categories,
    });
  } catch (error) {
    console.error("Error getting categories by type:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve categories",
    });
  }
};

// Create new category
const createCategory = async (req, res) => {
  try {
    const { name, type, iconUrl } = req.body;

    // Validate required fields
    if (!name || !type) {
      return res.status(400).json({
        success: false,
        message: "Name and type are required",
      });
    }

    // Validate category type
    if (type !== "income" && type !== "expense" && type !== "saving") {
      return res.status(400).json({
        success: false,
        message:
          'Invalid category type. Type must be "income", "saving", or "expense"',
      });
    }

    const newCategory = await categoriesRepository.createCategory(
      name,
      type,
      iconUrl || "bx-help-circle"
    );

    res.status(201).json({
      success: true,
      data: newCategory,
    });
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create category",
    });
  }
};

// Update category
const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, type, iconUrl } = req.body;

    // Check if category exists
    const existingCategory = await categoriesRepository.getCategoryById(id);
    if (!existingCategory) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    // Use existing values if not provided in request
    const updatedName = name || existingCategory.name;
    const updatedType = type || existingCategory.type;
    const updatedIconUrl = iconUrl || existingCategory.icon_url;

    // Validate category type if provided
    if (type && type !== "income" && type !== "expense" && type !== "saving") {
      return res.status(400).json({
        success: false,
        message:
          'Invalid category type. Type must be "income", "saving", or "expense"',
      });
    }

    const updatedCategory = await categoriesRepository.updateCategory(
      id,
      updatedName,
      updatedType,
      updatedIconUrl
    );

    res.status(200).json({
      success: true,
      data: updatedCategory,
    });
  } catch (error) {
    console.error("Error updating category:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update category",
    });
  }
};

// Delete category
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if category exists
    const existingCategory = await categoriesRepository.getCategoryById(id);
    if (!existingCategory) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    await categoriesRepository.deleteCategory(id);

    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete category",
    });
  }
};

module.exports = {
  getAllCategories,
  getCategoryById,
  getCategoriesByType,
  createCategory,
  updateCategory,
  deleteCategory,
};
