import { categoryApi } from "./api/category-api.js";
import { poiApi } from "./api/poi-api.js";
import { userApi } from "./api/user-api.js";
import { accountController } from "./controllers/account-controller.js";
import { categoryController } from "./controllers/category-controller.js";
import { dashboardController } from "./controllers/dashboard-controller.js";
import { editCategoryController } from "./controllers/edit-category-controller.js";
import { editPOIController } from "./controllers/edit-poi-controller.js";
import { profileController } from "./controllers/profile-controller.js";

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
    path: "/dashboard/category",
    config: dashboardController.addCategory,
  },
  {
    method: "GET" as const,
    path: "/dashboard/category/{id}",
    config: dashboardController.deleteCategory,
  },

  {
    method: "GET" as const,
    path: "/category/{id}",
    config: categoryController.index,
  },
  {
    method: "POST" as const,
    path: "/category/{id}/poi",
    config: categoryController.addPOI,
  },
  {
    method: "GET" as const,
    path: "/category/{categoryID}/poi/{id}",
    config: categoryController.deletePOI,
  },

  {
    method: "GET" as const,
    path: "/category/{id}/edit",
    config: editCategoryController.index,
  },
  {
    method: "POST" as const,
    path: "/category/{id}/edit",
    config: editCategoryController.updateCategory,
  },

  {
    method: "GET" as const,
    path: "/poi/{id}/edit",
    config: editPOIController.index,
  },
  {
    method: "POST" as const,
    path: "/poi/{id}/edit",
    config: editPOIController.updatePOI,
  },
];

export const apiRoutes = [
  { method: "POST" as const, path: "/api/users", config: userApi.create },
  { method: "GET" as const, path: "/api/users", config: userApi.findAll },
  { method: "GET" as const, path: "/api/users/{id}", config: userApi.find },
  { method: "PUT" as const, path: "/api/users/{id}", config: userApi.update },
  { method: "DELETE" as const, path: "/api/users", config: userApi.deleteAll },
  { method: "DELETE" as const, path: "/api/users/{id}", config: userApi.delete },

  { method: "POST" as const, path: "/api/users/{id}/categories", config: categoryApi.create },
  { method: "GET" as const, path: "/api/categories", config: categoryApi.findAll },
  { method: "GET" as const, path: "/api/categories/{id}", config: categoryApi.find },
  { method: "PUT" as const, path: "/api/categories/{id}", config: categoryApi.update },
  { method: "DELETE" as const, path: "/api/categories", config: categoryApi.deleteAll },
  { method: "DELETE" as const, path: "/api/categories/{id}", config: categoryApi.delete },

  { method: "POST" as const, path: "/api/categories/{id}/pois", config: poiApi.create },
  { method: "GET" as const, path: "/api/pois", config: poiApi.findAll },
  { method: "GET" as const, path: "/api/pois/{id}", config: poiApi.find },
  { method: "PUT" as const, path: "/api/pois/{id}", config: poiApi.update },
  { method: "DELETE" as const, path: "/api/pois", config: poiApi.deleteAll },
  { method: "DELETE" as const, path: "/api/pois/{id}", config: poiApi.delete },
];
