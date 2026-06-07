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
  requireRole,
  showUsersPage,
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
router.get("/new-organization", requireRole("admin"), showNewOrganizationForm);
router.post(
  "/new-organization",
  requireRole("admin"),
  organizationValidation,
  processNewOrganizationForm,
);
router.get("/edit-organization/:id", requireRole("admin"), showEditOrganizationForm);
router.post(
  "/edit-organization/:id",
  requireRole("admin"),
  organizationValidation,
  processEditOrganizationForm,
);
router.get("/projects", getProjectsPage);
router.get("/project/:id", getProjectDetailsPage);
router.get("/project/:projectId/assign-categories", requireRole("admin"), showAssignCategoriesForm);
router.post(
  "/project/:projectId/assign-categories",
  requireRole("admin"),
  processAssignCategoriesForm,
);
router.get("/new-project", requireRole("admin"), showNewProjectForm);
router.post("/new-project", requireRole("admin"), projectValidation, processNewProjectForm);
router.get("/edit-project/:id", requireRole("admin"), showEditProjectForm);
router.post("/edit-project/:id", requireRole("admin"), projectValidation, processEditProjectForm);
router.get("/categories", getCategoriesPage);
router.get("/category/:id", getCategoryDetailsPage);
router.get("/new-category", requireRole("admin"), showNewCategoryForm);
router.post("/new-category", requireRole("admin"), categoryValidation, processNewCategoryForm);
router.get("/edit-category/:id", requireRole("admin"), showEditCategoryForm);
router.post(
  "/edit-category/:id",
  requireRole("admin"),
  categoryValidation,
  processEditCategoryForm,
);

// user routes
router.get("/register", showUserRegistrationForm);
router.post("/register", userRegistrationValidation, processUserRegistrationForm);
router.get("/login", showLoginForm);
router.post("/login", processLoginForm);
router.get("/logout", processLogout);
router.get("/dashboard", requireLogin, showDashboard);
router.get("/users", requireLogin, requireRole("admin"), showUsersPage);

// error-handling routes
router.get("/test-error", getTestErrorPage);

export default router;
