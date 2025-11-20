import { Request, ResponseToolkit } from "@hapi/hapi";
import { User } from "../types/user-types";
import { db } from "../models/db";

export const accountController = {
  index: {
    handler: function (request: Request, h: ResponseToolkit) {
      return h.view("main", { title: "Placemark" });
    },
  },
  showSignup: {
    handler: function (request: Request, h: ResponseToolkit) {
      return h.view("signup", { title: "Sign Up to Placemark" });
    },
  },
  signup: {
    handler: async function (request: Request, h: ResponseToolkit) {
      const user = request.payload as User;
      await db.userStore?.addUser(user);
      return h.redirect("/");
    },
  },
  showLogin: {
    handler: function (request: Request, h: ResponseToolkit) {
      return h.view("login", { title: "Login to Placemark" });
    },
  },
  login: {
    handler: async function (request: Request, h: ResponseToolkit) {
      const { email, password } = request.payload as any;
      const user = await db.userStore?.getUserByEmail(email);
      if (!user || user.password !== password) {
        return h.redirect("/");
      }
      return h.redirect("/dashboard");
    },
  },
  logout: {
    handler: function (request: Request, h: ResponseToolkit) {
      return h.redirect("/");
    },
  },
};
