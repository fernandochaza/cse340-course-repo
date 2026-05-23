import { getAllCategories, getCategoryById } from "../models/categories.js";
import { getProjectsByCategory } from "../models/projects.js";

export const getCategoriesPage = async (req, res) => {
  const title = "Service Categories";
  const categories = await getAllCategories();
  res.render("categories", { title, categories });
};

export const getCategoryDetailsPage = async (req, res) => {
  const categoryId = req.params.id;
  const category = await getCategoryById(categoryId);
  if (!category) {
    const err = new Error("Category not found");
    err.status = 404;
    throw err;
  }
  const projects = await getProjectsByCategory(categoryId);
  res.render("category", { title: category.name, category, projects });
};
