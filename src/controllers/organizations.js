import { getAllOrganizations } from "../models/organizations.js";

export const getOrganizationsPage = async (req, res) => {
  const organizations = await getAllOrganizations();
  const title = "Our Partner Organizations";

  res.render("organizations", { title, organizations });
};
