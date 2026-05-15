import db from "./db.js";

const getAllCategories = async () => {
  const query = `
      SELECT * FROM public.project_categories;
    `;

  const result = await db.query(query);

  return result.rows;
};

export { getAllCategories };
