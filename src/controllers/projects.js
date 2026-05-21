import { getAllProjects, getProjectDetails, getUpcomingProjects } from "../models/projects.js";

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
    // TODO: think about how to redirect to 404 page instead of sending text response
    return res.status(404).send("Project not found");
  }

  const title = projectDetails.title;
  res.render("project", { title, projectDetails });
};

export { getProjectsPage, getProjectDetailsPage };
