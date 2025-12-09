export type SimpleUser = {
  id: string;
  name?: string;
  email: string;
  password: string; // plain text, just for demo
};

// In-memory "database" (resets when server restarts)
const users: SimpleUser[] = [];

// Find user by email
export function findUserByEmail(email: string): SimpleUser | undefined {
  return users.find(
    (u) => u.email.toLowerCase() === email.toLowerCase()
  );
}

// Create new user
export function createUser(
  name: string,
  email: string,
  password: string
): SimpleUser {
  const user: SimpleUser = {
    id: Date.now().toString(),
    name,
    email,
    password,
  };
  users.push(user);
  return user;
}
