import db from "./db.js";

const getAllCategories = async () => {
  const query = `
      SELECT category_id, name, image_filename FROM public.project_categories;
    `;

  const result = await db.query(query);

  return result.rows;
};

const getCategoryById = async (id) => {
  const query = `
      SELECT * FROM public.project_categories WHERE category_id = $1;
    `;
  const params = [id];

  const result = await db.query(query, params);

  return result.rows[0];
};

const getProjectCategories = async (projectId) => {
  const query = `
    SELECT cat.category_id, cat.name, cat.image_filename FROM public.project_categories AS cat
    JOIN service_project_category AS spc ON spc.category_id = cat.category_id
    WHERE spc.service_project_id = $1
  `;
  const params = [projectId];

  const result = await db.query(query, params);

  return result.rows;
};

const assignCategoryToProject = async (projectId, categoryId) => {
  const query = `
      INSERT INTO service_project_category (service_project_id, category_id)
      VALUES ($1, $2);
    `;
  await db.query(query, [projectId, categoryId]);
};

const updateCategoryAssignments = async (projectId, categoryIds) => {
  await db.query(`DELETE FROM service_project_category WHERE service_project_id = $1`, [projectId]);
  for (const categoryId of categoryIds) {
    await assignCategoryToProject(projectId, categoryId);
  }
};

export { getAllCategories, getCategoryById, getProjectCategories, updateCategoryAssignments };
