import bcrypt from "bcrypt";
import db from "./db.js";

// create a function to insert a new user into the database.
// This function should accept name, email, and password hash as parameters. It should assign the new user to the "user" role.
const createUser = async (name, email, passwordHash) => {
  const query = `
    INSERT INTO users (name, email, password_hash, role_id)
    VALUES ($1, $2, $3, (SELECT role_id FROM roles WHERE role_name = 'user'))
    RETURNING user_id, name, email, role_id;
  `;

  const queryParams = [name, email, passwordHash];
  const result = await db.query(query, queryParams);

  return result.rows[0];
};

const findUserByEmail = async (email) => {
  const query = `
    SELECT u.user_id, u.name, u.email, u.password_hash, r.role_name
    FROM users u
    JOIN roles r ON u.role_id = r.role_id
    WHERE u.email = $1
  `;
  const queryParams = [email];

  const result = await db.query(query, queryParams);

  if (result.rows.length === 0) {
    return null; // User not found
  }

  return result.rows[0];
};

const verifyPassword = async (password, passwordHash) => {
  return bcrypt.compare(password, passwordHash);
};

const authenticateUser = async (email, password) => {
  const user = await findUserByEmail(email);

  if (!user) {
    return null;
  }

  const passwordMatch = await verifyPassword(password, user.password_hash);

  if (!passwordMatch) {
    return null;
  }

  delete user.password_hash;
  return user;
};

const getAllUsers = async () => {
  const query = `
    SELECT u.user_id, u.name, u.email, r.role_name
    FROM users u
    JOIN roles r ON u.role_id = r.role_id
    ORDER BY u.name ASC
  `;
  const result = await db.query(query);
  return result.rows;
};

export { createUser, authenticateUser, getAllUsers };
