import { body, validationResult } from "express-validator";
import {
  getAllProjects,
  getProjectDetails,
  getUpcomingProjects,
  createProject,
} from "../models/projects.js";
import { getOrganizationList } from "../models/organizations.js";
import { getProjectCategories } from "../models/categories.js";

const NUMBER_OF_UPCOMING_PROJECTS = 5;

const projectValidation = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Project title is required")
    .isLength({ min: 3, max: 200 })
    .withMessage("Project title must be between 3 and 200 characters"),
  body("description")
    .trim()
    .notEmpty()
    .withMessage("Project description is required")
    .isLength({ max: 1000 })
    .withMessage("Project description cannot exceed 1000 characters"),
  body("location")
    .trim()
    .notEmpty()
    .withMessage("Project location is required")
    .isLength({ max: 200 })
    .withMessage("Project location cannot exceed 200 characters"),
  body("date")
    .notEmpty()
    .withMessage("Project date is required")
    .isDate()
    .withMessage("Please provide a valid date"),
  body("organizationId")
    .notEmpty()
    .withMessage("Organization is required")
    .isInt()
    .withMessage("Please select a valid organization"),
];

const getProjectsPage = async (req, res) => {
  const title = "Upcoming Service Projects";
  const projects = await getUpcomingProjects(NUMBER_OF_UPCOMING_PROJECTS);
  res.render("projects", { title, projects });
};

const getProjectDetailsPage = async (req, res) => {
  const projectId = req.params.id;
  const projectDetails = await getProjectDetails(projectId);

  if (!projectDetails) {
    const err = new Error("Project not found");
    err.status = 404;
    throw err;
  }

  const categories = await getProjectCategories(projectId);

  const title = projectDetails.title;
  res.render("project", { title, projectDetails, categories });
};

const showNewProjectForm = async (req, res) => {
  const organizations = await getOrganizationList();
  const title = "Add New Service Project";

  res.render("new-project", { title, organizations });
};

const processNewProjectForm = async (req, res) => {
  const results = validationResult(req);
  if (!results.isEmpty()) {
    results.array().forEach((error) => {
      req.flash("error", error.msg);
    });
    return res.redirect("/new-project");
  }

  const { organizationId, title, description, location, date } = req.body;

  await createProject(title, description, location, date, organizationId);
  req.flash("success", "Service project added successfully!");
  res.redirect("/projects");
};

export {
  getProjectsPage,
  getProjectDetailsPage,
  showNewProjectForm,
  processNewProjectForm,
  projectValidation,
};
