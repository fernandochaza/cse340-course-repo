import { body, validationResult } from "express-validator";
import {
  getAllCategories,
  getCategoryById,
  getProjectCategories,
  updateCategoryAssignments,
  createCategory,
  updateCategory,
} from "../models/categories.js";
import { getProjectsByCategory, getProjectDetails } from "../models/projects.js";

const categoryValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Category name is required")
    .isLength({ min: 3, max: 100 })
    .withMessage("Category name must be between 3 and 100 characters"),
];

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

export const showNewCategoryForm = async (req, res) => {
  const title = "Add New Category";
  const formData = req.session.formData || {};
  delete req.session.formData;
  res.render("new-category", { title, formData });
};

export const processNewCategoryForm = async (req, res) => {
  const results = validationResult(req);
  if (!results.isEmpty()) {
    results.array().forEach((error) => {
      req.flash("error", error.msg);
    });
    req.session.formData = req.body;
    return res.redirect("/new-category");
  }

  const { name } = req.body;
  const categoryId = await createCategory(name);
  req.flash("success", "Category added successfully!");
  res.redirect(`/category/${categoryId}`);
};

export const showEditCategoryForm = async (req, res) => {
  const categoryId = req.params.id;
  const category = await getCategoryById(categoryId);
  if (!category) {
    const err = new Error("Category not found");
    err.status = 404;
    throw err;
  }
  const title = "Edit Category";
  res.render("edit-category", { title, category });
};

export const processEditCategoryForm = async (req, res) => {
  const categoryId = req.params.id;

  const results = validationResult(req);
  if (!results.isEmpty()) {
    results.array().forEach((error) => {
      req.flash("error", error.msg);
    });
    return res.redirect(`/edit-category/${categoryId}`);
  }

  const { name } = req.body;
  await updateCategory(categoryId, name);
  req.flash("success", "Category updated successfully!");
  res.redirect(`/category/${categoryId}`);
};

export { categoryValidation };
