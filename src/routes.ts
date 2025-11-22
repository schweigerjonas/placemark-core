import { accountController } from "./controllers/account-controller";
import { dashboardController } from "./controllers/dashboard-controller";
import { profileController } from "./controllers/profile-controller";

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

  {
    method: "GET" as const,
    path: "/dashboard",
    config: dashboardController.index,
  },

  {
    method: "GET" as const,
    path: "/profile",
    config: profileController.index,
  },
  {
    method: "POST" as const,
    path: "/profile/update/{id}",
    config: profileController.update,
  },
];
