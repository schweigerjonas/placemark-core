import { Request, ResponseToolkit } from "@hapi/hapi";
import { PointOfInterestDetails } from "../types/poi-types.js";
import { db } from "../models/db.js";
import { PointOfInterestValidator } from "../models/joi-schemas.js";
import { imageStore } from "../models/image-store.js";

export const categoryController = {
  index: {
    handler: async function (request: Request, h: ResponseToolkit) {
      const { id } = request.params;
      const category = await db.categoryStore?.getCategoryById(id);

      if (!category) {
        console.error("Category not found.");
        return h.redirect("/dashboard");
      }

      const categoryPOIs = await db.poiStore?.getPOIsByCategoryId(category._id);

      const viewData = {
        title: category.title,
        category: category,
        pois: categoryPOIs,
      };

      return h.view("category", viewData);
    },
  },
  addPOI: {
    validate: {
      payload: PointOfInterestValidator,
      options: {
        abortEarly: false,
        convert: true,
      },
      failAction: function (request: Request, h: ResponseToolkit, error: any) {
        return h.view("category", { title: "Sign up error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request: Request, h: ResponseToolkit) {
      const { id } = request.params;
      const poi = request.payload as PointOfInterestDetails;
      const category = await db.categoryStore?.getCategoryById(id);

      if (!category) {
        console.error("Category not found.");
        return h.redirect("/dashboard");
      }

      await db.poiStore?.addPOI(category._id, poi);

      return h.redirect(`/category/${id}`);
    },
  },
  deletePOI: {
    handler: async function (request: Request, h: ResponseToolkit) {
      const { categoryID, id } = request.params;
      await db.poiStore?.deletePOIById(id);
      return h.redirect(`/category/${categoryID}`);
    },
  },
  uploadImage: {
    handler: async function (request: Request, h: ResponseToolkit) {
      try {
        const category = await db.categoryStore?.getCategoryById(request.params.id);

        if (!category) {
          return h.redirect(`/category/${request.params.id}`);
        }

        const file = (request.payload as any).imageFile;

        if (Object.keys(file).length > 0) {
          const url = await imageStore.uploadImage(file);
          category.img = url;
          await db.categoryStore?.updateCategory(category._id, category);
        }

        return h.redirect(`/category/${request.params.id}`);
      } catch (err) {
        console.error(err);
        return h.redirect(`/category/${request.params.id}`);
      }
    },
    payload: {
      multipart: true,
      output: "data",
      maxBytes: 209715200,
      parse: true,
    },
  },
  deleteImage: {
    handler: async function (request: Request, h: ResponseToolkit) {
      try {
        const category = await db.categoryStore?.getCategoryById(request.params.id);

        if (!category || !category.img) {
          return h.redirect(`/category/${request.params.id}`);
        }

        await imageStore.deleteImage(category.img.publicID);
        category.img = {
          url: "",
          publicID: "",
        };
        await db.categoryStore?.updateCategory(category._id, category);

        return h.redirect(`/category/${request.params.id}`);
      } catch (err) {
        console.error(err);
        return h.redirect(`/category/${request.params.id}`);
      }
    },
  },
};
