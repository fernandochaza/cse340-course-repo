import db from "./db.js";

const getAllProjects = async () => {
  const query = `
      SELECT p.service_project_id, p.organization_id, p.title, p.description, p.location, p.project_date, o.name AS organization_name
      FROM public.service_project p
      JOIN public.organization o ON p.organization_id = o.organization_id;
    `;

  const result = await db.query(query);

  return result.rows;
};

const getProjectsByOrganizationId = async (organizationId) => {
  const query = `
        SELECT
          service_project_id,
          organization_id,
          title,
          description,
          location,
          project_date
        FROM service_project
        WHERE organization_id = $1
        ORDER BY project_date;
      `;

  const queryParams = [organizationId];
  const result = await db.query(query, queryParams);

  return result.rows;
};

const getUpcomingProjects = async (number_of_projects) => {
  const query = `
        SELECT
          sp.service_project_id,
          sp.organization_id,
          sp.title,
          sp.description,
          sp.location,
          sp.project_date,
          org.name AS organization_name
        FROM service_project as sp
        JOIN organization as org ON sp.organization_id = org.organization_id
        WHERE sp.project_date >= CURRENT_DATE
        ORDER BY sp.project_date
        LIMIT $1;
      `;

  const queryParams = [number_of_projects];
  const result = await db.query(query, queryParams);
  return result.rows;
};

const getProjectDetails = async (id) => {
  const query = `
        SELECT
          sp.service_project_id,
          sp.organization_id,
          sp.title,
          sp.description,
          sp.location,
          sp.project_date,
          org.name AS organization_name
        FROM service_project as sp
        JOIN organization as org ON sp.organization_id = org.organization_id
        WHERE sp.service_project_id = $1;
      `;

  const queryParams = [id];
  const result = await db.query(query, queryParams);

  return result.rows[0];
};

const getProjectsByCategory = async (category_id) => {
  const query = `
    SELECT 
      sp.service_project_id,
      sp.organization_id,
      sp.title,
      sp.description,
      sp.location,
      sp.project_date
    FROM service_project AS sp
    JOIN service_project_category AS spc ON spc.service_project_id = sp.service_project_id
    WHERE spc.category_id = $1
  `;

  const queryParams = [category_id];
  const result = await db.query(query, queryParams);

  return result.rows;
};

export {
  getAllProjects,
  getProjectsByOrganizationId,
  getUpcomingProjects,
  getProjectDetails,
  getProjectsByCategory,
};
