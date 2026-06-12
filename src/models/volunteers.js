import db from "./db.js";

const addVolunteer = async (userId, projectId) => {
  const query = `
    INSERT INTO user_project_volunteer (user_id, service_project_id)
    VALUES ($1, $2)
    RETURNING user_id, service_project_id, volunteered_at;
  `;
  const result = await db.query(query, [userId, projectId]);
  return result.rows[0];
};

const removeVolunteer = async (userId, projectId) => {
  const query = `
    DELETE FROM user_project_volunteer
    WHERE user_id = $1 AND service_project_id = $2;
  `;
  await db.query(query, [userId, projectId]);
};

const getProjectsByVolunteer = async (userId) => {
  const query = `
    SELECT sp.service_project_id, sp.title, sp.description, sp.location, sp.project_date,
           o.name AS organization_name, upv.volunteered_at
    FROM service_project AS sp
    JOIN user_project_volunteer AS upv ON upv.service_project_id = sp.service_project_id
    JOIN organization AS o ON o.organization_id = sp.organization_id
    WHERE upv.user_id = $1
    ORDER BY sp.project_date ASC;
  `;
  const result = await db.query(query, [userId]);
  return result.rows;
};

export { addVolunteer, removeVolunteer, getProjectsByVolunteer };
