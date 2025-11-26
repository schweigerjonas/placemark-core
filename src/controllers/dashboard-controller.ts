import { Request, ResponseToolkit } from "@hapi/hapi";
import { db } from "../models/db.js";

export const dashboardController = {
  index: {
    handler: async function (request: Request, h: ResponseToolkit) {
      const loggedInUser = request.auth.credentials;
      const pois = await db.poiStore?.getAllPOIs();
      const viewData = {
        title: "Placemark Dashboard",
        user: loggedInUser,
        pois: pois,
      };
      return h.view("dashboard", viewData);
    },
  },
};
