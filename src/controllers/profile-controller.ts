import { Request, ResponseToolkit } from "@hapi/hapi";

export const profileController = {
  index: {
    handler: function (request: Request, h: ResponseToolkit) {
      return h.view("profile", { title: "Placemark Profile" });
    },
  },
};
