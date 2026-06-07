import bcrypt from "bcrypt";
import { body, validationResult } from "express-validator";
import { createUser, authenticateUser, getAllUsers } from "../models/users.js";

const userRegistrationValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 2, max: 100 })
    .withMessage("Name must be between 2 and 100 characters"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please provide a valid email address"),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];

const showUserRegistrationForm = (req, res) => {
  const formData = req.session.formData || {};
  delete req.session.formData;
  res.render("register", { title: "User Registration", formData, scripts: ["/js/register.js"] });
};

const processUserRegistrationForm = async (req, res) => {
  const results = validationResult(req);
  if (!results.isEmpty()) {
    results.array().forEach((error) => {
      req.flash("error", error.msg);
    });
    req.session.formData = req.body;
    return res.redirect("/register");
  }

  const { name, email, password } = req.body;
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  await createUser(name, email, passwordHash);
  req.flash("success", "Registration successful! You can now log in.");
  res.redirect("/");
};

export { showUserRegistrationForm, processUserRegistrationForm, userRegistrationValidation };

const showLoginForm = (req, res) => {
  res.render("login", { title: "Login" });
};

const processLoginForm = async (req, res) => {
  const { email, password } = req.body;
  const user = await authenticateUser(email, password);

  if (user) {
    req.session.user = user;
    req.flash("success", "Login successful!");
    console.log("Logged in user:", user);
    return res.redirect("/dashboard");
  }

  req.flash("error", "Invalid email or password.");
  res.redirect("/login");
};

const processLogout = (req, res) => {
  delete req.session.user;
  req.flash("success", "You have been logged out.");
  res.redirect("/login");
};

const requireLogin = (req, res, next) => {
  if (!req.session || !req.session.user) {
    req.flash("error", "You must be logged in to access that page.");
    return res.redirect("/login");
  }
  next();
};

const showDashboard = (req, res) => {
  const { name, email } = req.session.user;
  res.render("dashboard", { title: "Dashboard", name, email });
};

const requireRole = (role) => {
  return (req, res, next) => {
    if (req.session && req.session.user && req.session.user.role_name === role) {
      return next();
    }
    req.flash("error", "You do not have permission to access that page.");
    res.redirect("/dashboard");
  };
};

const showUsersPage = async (req, res) => {
  const users = await getAllUsers();
  res.render("users", { title: "Users", users });
};

export {
  showLoginForm,
  processLoginForm,
  processLogout,
  requireLogin,
  showDashboard,
  requireRole,
  showUsersPage,
};
