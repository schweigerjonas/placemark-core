import Boom from "@hapi/boom";
import { Request, ResponseToolkit } from "@hapi/hapi";
import { imageStore } from "../models/image-store.js";
import { Image } from "../types/image-types.js";
import { ImageSpec } from "../models/joi-schemas.js";
import { validationError } from "./logger.js";

export const imageApi = {
  upload: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request: Request, h: ResponseToolkit) {
      try {
        let image: Image = {} as Image;
        const file = (request.payload as any).imageFile;

        if (Object.keys(file).length > 0) {
          image = await imageStore.uploadImage(file);
        }

        if (image.publicID) {
          return h.response(image).code(201);
        }
        return Boom.badImplementation("error uploading image");
      } catch (err) {
        return Boom.serverUnavailable("Database error");
      }
    },
    payload: {
      multipart: true,
      output: "data",
      maxBytes: 209715200,
      parse: true,
    },
    tags: ["api"],
    description: "Upload an image",
    notes: "Returns uploaded image",
    response: { schema: ImageSpec, failAction: validationError },
  },
};
