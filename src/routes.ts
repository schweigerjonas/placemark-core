import { accountController } from "./controllers/account-controller";

export const routes = [
  {
    method: "GET" as const,
    path: "/",
    config: accountController.index,
  },
  {
    method: "GET" as const,
    path: "/signup",
    config: accountController.showSignup,
  },
  {
    method: "GET" as const,
    path: "/login",
    config: accountController.showLogin,
  },
  {
    method: "GET" as const,
    path: "/logout",
    config: accountController.logout,
  },
  {
    method: "POST" as const,
    path: "/register",
    config: accountController.signup,
  },
  {
    method: "POST" as const,
    path: "/authenticate",
    config: accountController.login,
  },
];
