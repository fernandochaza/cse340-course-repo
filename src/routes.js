import express from "express";

import { getHomePage } from "./controllers/index.js";
import { getOrganizationsPage } from "./controllers/organizations.js";
import {
  getProjectsPage,
  getProjectDetailsPage,
  showNewProjectForm,
  processNewProjectForm,
  showEditProjectForm,
  processEditProjectForm,
  projectValidation,
} from "./controllers/projects.js";
import {
  getCategoriesPage,
  getCategoryDetailsPage,
  showAssignCategoriesForm,
  processAssignCategoriesForm,
  showNewCategoryForm,
  processNewCategoryForm,
  showEditCategoryForm,
  processEditCategoryForm,
  categoryValidation,
} from "./controllers/categories.js";
import { getTestErrorPage } from "./controllers/errors.js";
import {
  showUserRegistrationForm,
  processUserRegistrationForm,
  userRegistrationValidation,
  showLoginForm,
  processLoginForm,
  processLogout,
  requireLogin,
  showDashboard,
} from "./controllers/users.js";
import {
  showOrganizationDetailsPage,
  showNewOrganizationForm,
  processNewOrganizationForm,
  showEditOrganizationForm,
  processEditOrganizationForm,
  organizationValidation,
} from "./controllers/organizations.js";

const router = express.Router();

router.get("/", getHomePage);
router.get("/organizations", getOrganizationsPage);
router.get("/organization/:id", showOrganizationDetailsPage);
router.get("/new-organization", showNewOrganizationForm);
router.post("/new-organization", organizationValidation, processNewOrganizationForm);
router.get("/edit-organization/:id", showEditOrganizationForm);
router.post("/edit-organization/:id", organizationValidation, processEditOrganizationForm);
router.get("/projects", getProjectsPage);
router.get("/project/:id", getProjectDetailsPage);
router.get("/project/:projectId/assign-categories", showAssignCategoriesForm);
router.post("/project/:projectId/assign-categories", processAssignCategoriesForm);
router.get("/new-project", showNewProjectForm);
router.post("/new-project", projectValidation, processNewProjectForm);
router.get("/edit-project/:id", showEditProjectForm);
router.post("/edit-project/:id", projectValidation, processEditProjectForm);
router.get("/categories", getCategoriesPage);
router.get("/category/:id", getCategoryDetailsPage);
router.get("/new-category", showNewCategoryForm);
router.post("/new-category", categoryValidation, processNewCategoryForm);
router.get("/edit-category/:id", showEditCategoryForm);
router.post("/edit-category/:id", categoryValidation, processEditCategoryForm);

// user routes
router.get("/register", showUserRegistrationForm);
router.post("/register", userRegistrationValidation, processUserRegistrationForm);
router.get("/login", showLoginForm);
router.post("/login", processLoginForm);
router.get("/logout", processLogout);
router.get("/dashboard", requireLogin, showDashboard);

// error-handling routes
router.get("/test-error", getTestErrorPage);

export default router;
