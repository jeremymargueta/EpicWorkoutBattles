import pool from "../config/db";

export interface User {
  id?: number;
  username: string;
  fname: string;
  lname: string;
  password: string;
  email: string;
}

export const createUser = async (user: User): Promise<void> => {
  try {
    const query =
      "INSERT INTO users (username,fname, lname, email, password) VALUES (?, ?, ?, ?, ?)";
    const param = [
      user.username,
      user.fname,
      user.lname,
      user.email,
      user.password,
    ];

    await pool.query(query, param);
  } catch (error) {
    console.error(`Error creating user: ${(error as Error).message}`);
    throw new Error(`Error creating user: ${(error as Error).message}`);
  }
};

export const findUserByEmail = async (email: string): Promise<User | null> => {
  try {
    const query = "SELECT * FROM users WHERE email = ?";
    const params = [email];
    const [rows]: any = await pool.query(query, params);

    if (!rows || rows.length === 0) {
      return null;
    }

    return rows[0] as User;
  } catch (error) {
    console.error("❌ Database Error in findUserByEmail:", error);
    throw new Error("Database query failed");
  }
};

export const findUserByUsername = async (
  username: string
): Promise<User | null> => {
  try {
    const query = "SELECT * FROM users WHERE username = ?";
    const params = [username];
    const [rows]: any = await pool.query(query, params);

    if (!rows || rows.length === 0) {
      return null;
    }

    return rows[0] as User;
  } catch (error) {
    console.error("❌ Database Error in findUserByUsername:", error);
    throw new Error("Database query failed");
  }
};
