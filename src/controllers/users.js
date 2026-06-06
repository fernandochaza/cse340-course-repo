import bcrypt from "bcrypt";
import { body, validationResult } from "express-validator";
import { createUser } from "../models/users.js";

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
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),
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
