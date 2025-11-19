import { authenticationController } from "./controllers/authentication-controller";

export const routes = [
  {
    method: "GET" as const,
    path: "/",
    config: authenticationController.index,
  },
];
