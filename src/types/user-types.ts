export type User = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: "user" | "admin";
  _id: string;
};

export type UserDetails = Omit<User, "_id">;
