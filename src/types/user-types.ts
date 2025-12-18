export enum Role {
  User = "USER",
  Admin = "ADMIN",
}

export type User = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: Role;
  _id: string;
};

export type UserDetails = Omit<User, "_id">;
