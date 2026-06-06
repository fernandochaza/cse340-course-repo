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

export { createUser };
