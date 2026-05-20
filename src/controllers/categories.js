import { getAllCategories } from "../models/categories.js";

export const getCategoriesPage = async (req, res) => {
  const title = "Service Categories";
  const categories = await getAllCategories();
  res.render("categories", { title, categories });
};
