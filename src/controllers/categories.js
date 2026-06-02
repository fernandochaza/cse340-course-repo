import {
  getAllCategories,
  getCategoryById,
  getProjectCategories,
  updateCategoryAssignments,
} from "../models/categories.js";
import { getProjectsByCategory, getProjectDetails } from "../models/projects.js";

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

export const showAssignCategoriesForm = async (req, res) => {
  const projectId = req.params.projectId;
  const projectDetails = await getProjectDetails(projectId);
  const allCategories = await getAllCategories();
  const assignedCategories = await getProjectCategories(projectId);
  const title = "Assign Categories to Project";

  res.render("assign-categories", { title, projectDetails, allCategories, assignedCategories });
};

export const processAssignCategoriesForm = async (req, res) => {
  const projectId = req.params.projectId;

  // Normalize: could be undefined (none checked), a string (one checked), or array (many checked)
  const raw = req.body.categoryIds;
  const categoryIds = raw ? (Array.isArray(raw) ? raw : [raw]) : [];

  await updateCategoryAssignments(projectId, categoryIds);
  req.flash("success", "Categories updated successfully!");
  res.redirect(`/project/${projectId}`);
};
