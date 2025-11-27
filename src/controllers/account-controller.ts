import { Request, ResponseToolkit } from "@hapi/hapi";
import { UserDetails } from "../types/user-types.js";
import { db } from "../models/db.js";
import { UserCredentialsSpec, UserSpec } from "../models/joi-schemas.js";

export const accountController = {
  index: {
    auth: false,
    handler: function (request: Request, h: ResponseToolkit) {
      return h.view("main", { title: "Placemark" });
    },
  },
  showSignup: {
    auth: false,
    handler: function (request: Request, h: ResponseToolkit) {
      return h.view("signup", { title: "Sign Up to Placemark" });
    },
  },
  signup: {
    auth: false,
    validate: {
      payload: UserSpec,
      options: { abortEarly: false },
      failAction: function (request: Request, h: ResponseToolkit, error: any) {
        return h.view("signup", { title: "Sign up error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request: Request, h: ResponseToolkit) {
      const user = request.payload as UserDetails;
      await db.userStore?.addUser(user);
      return h.redirect("/");
    },
  },
  showLogin: {
    auth: false,
    handler: function (request: Request, h: ResponseToolkit) {
      return h.view("login", { title: "Login to Placemark" });
    },
  },
  login: {
    auth: false,
    validate: {
      payload: UserCredentialsSpec,
      options: { abortEarly: false },
      failAction: function (request: Request, h: ResponseToolkit, error: any) {
        return h.view("login", { title: "Login error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request: Request, h: ResponseToolkit) {
      const { email, password } = request.payload as any;
      const user = await db.userStore?.getUserByEmail(email);
      if (!user || user.password !== password) {
        return h.redirect("/");
      }
      request.cookieAuth.set({ id: user._id });
      return h.redirect("/dashboard");
    },
  },
  logout: {
    handler: function (request: Request, h: ResponseToolkit) {
      request.cookieAuth.clear();
      return h.redirect("/");
    },
  },

  async validate(request: Request, session: any) {
    const user = await db.userStore?.getUserById(session.id);
    if (!user) {
      return { isValid: false };
    }
    return { isValid: true, credentials: user };
  },
};
