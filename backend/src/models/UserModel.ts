import pool from "../config/db";

export interface User {
  id?: number;
  username: string;
  password: string;
  email: string;
}

export const createUser = async (user: User): Promise<void> => {
  await pool.query(
    "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
    [user.username, user.email, user.password]
  );
};

export const findUserByEmail = async (email: string): Promise<User | null> => {
  const [rows]: any = await pool.query("SELECT * FROM users WHERE email = ?", [
    email,
  ]);
  return rows.length ? rows[0] : null;
};
