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

export { getAllCategories, getCategoryById, getProjectCategories };
