import express from "express";

import { getHomePage } from "./controllers/index.js";
import { getOrganizationsPage } from "./controllers/organizations.js";
import { getProjectsPage, getProjectDetailsPage } from "./controllers/projects.js";
import { getCategoriesPage, getCategoryDetailsPage } from "./controllers/categories.js";
import { getTestErrorPage } from "./controllers/errors.js";
import { showOrganizationDetailsPage } from "./controllers/organizations.js";

const router = express.Router();

router.get("/", getHomePage);
router.get("/organizations", getOrganizationsPage);
router.get("/organization/:id", showOrganizationDetailsPage);
router.get("/projects", getProjectsPage);
router.get("/project/:id", getProjectDetailsPage);
router.get("/categories", getCategoriesPage);
router.get("/category/:id", getCategoryDetailsPage);

// error-handling routes
router.get("/test-error", getTestErrorPage);

export default router;
