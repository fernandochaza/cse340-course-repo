import { getAllProjects } from "../models/projects.js";

export const getProjectsPage = async (req, res) => {
  const title = "Service Projects";
  const projects = await getAllProjects();
  res.render("projects", { title, projects });
};
