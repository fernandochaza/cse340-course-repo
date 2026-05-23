import { getAllProjects, getProjectDetails, getUpcomingProjects } from "../models/projects.js";

import { getProjectCategories } from "../models/categories.js";

const NUMBER_OF_UPCOMING_PROJECTS = 5;

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

export { getProjectsPage, getProjectDetailsPage };
