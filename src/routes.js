import express from "express";

import { getHomePage } from "./controllers/index.js";
import { getOrganizationsPage } from "./controllers/organizations.js";
import { getProjectsPage } from "./controllers/projects.js";
import { getCategoriesPage } from "./controllers/categories.js";
import { getTestErrorPage } from "./controllers/errors.js";

const router = express.Router();

router.get("/", getHomePage);
router.get("/organizations", getOrganizationsPage);
router.get("/projects", getProjectsPage);
router.get("/categories", getCategoriesPage);

// error-handling routes
router.get("/test-error", getTestErrorPage);

export default router;
