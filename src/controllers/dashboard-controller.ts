import { Request, ResponseToolkit } from "@hapi/hapi";

export const dashboardController = {
  index: {
    handler: function (request: Request, h: ResponseToolkit) {
      return h.view("dashboard", { title: "Placemark Dashboard" });
    },
  },
};
