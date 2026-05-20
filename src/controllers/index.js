export const getHomePage = async (req, res) => {
  const title = "Home";
  res.render("home", { title });
};
