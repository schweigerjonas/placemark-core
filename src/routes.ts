import { userApi } from "./api/user-api";
import { accountController } from "./controllers/account-controller";
import { categoryController } from "./controllers/category-controller";
import { dashboardController } from "./controllers/dashboard-controller";
import { poiController } from "./controllers/poi-controller";
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
    path: "/profile",
    config: profileController.index,
  },
  {
    method: "POST" as const,
    path: "/profile/update/{id}",
    config: profileController.update,
  },
  {
    method: "GET" as const,
    path: "/profile/delete/{id}",
    config: profileController.delete,
  },

  {
    method: "GET" as const,
    path: "/dashboard",
    config: dashboardController.index,
  },

  {
    method: "POST" as const,
    path: "/category/poi",
    config: categoryController.addPOI,
  },
  {
    method: "GET" as const,
    path: "/category/poi/{id}",
    config: categoryController.deletePOI,
  },

  {
    method: "GET" as const,
    path: "/poi/{id}",
    config: poiController.index,
  },
  {
    method: "POST" as const,
    path: "/poi/{id}",
    config: poiController.updatePOI,
  },
];

export const apiRoutes = [
  { method: "POST", path: "/api/user", config: userApi.create },
  { method: "GET", path: "/api/user", config: userApi.find },
];
