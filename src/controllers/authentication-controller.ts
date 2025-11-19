import { Request, ResponseToolkit } from "@hapi/hapi";

export const authenticationController = {
  index: {
    handler: function (request: Request, h: ResponseToolkit) {
      return h.view("main", { title: "Placemark" });
    },
  },
};
