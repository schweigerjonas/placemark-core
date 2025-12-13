import Boom from "@hapi/boom";
import { Request, ResponseToolkit } from "@hapi/hapi";
import { db } from "../models/db.js";
import { PointOfInterestDetails } from "../types/poi-types.js";

export const poiApi = {
  create: {
    auth: false,
    handler: async function (request: Request, h: ResponseToolkit) {
      try {
        const poi = await db.poiStore?.addPOI(request.params.id, request.payload as PointOfInterestDetails);
        if (poi) {
          return h.response(poi).code(201);
        }
        return Boom.badImplementation("error creating POI");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

  findAll: {
    auth: false,
    handler: async function (request: Request, h: ResponseToolkit) {
      try {
        const pois = await db.poiStore?.getAllPOIs();
        return pois;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

  find: {
    auth: false,
    handler: async function (request: Request, h: ResponseToolkit) {
      try {
        const poi = await db.poiStore?.getPOIById(request.params.id);
        if (!poi) {
          return Boom.notFound("No POI with this id");
        }
        return poi;
      } catch (err) {
        return Boom.serverUnavailable("No POI with this id");
      }
    },
  },

  update: {
    auth: false,
    handler: async function (request: Request, h: ResponseToolkit) {
      try {
        const poi = await db.poiStore?.getPOIById(request.params.id);
        if (!poi) {
          return Boom.notFound("No POI with this id");
        }
        await db.poiStore?.updatePOI(poi, request.payload as PointOfInterestDetails);
        return h.response().code(201);
      } catch (err) {
        return Boom.serverUnavailable("Database error");
      }
    },
  },

  deleteAll: {
    auth: false,
    handler: async function (request: Request, h: ResponseToolkit) {
      try {
        await db.poiStore?.deleteAllPOIs();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

  delete: {
    auth: false,
    handler: async function (request: Request, h: ResponseToolkit) {
      try {
        const poi = await db.poiStore?.getPOIById(request.params.id);
        if (!poi) {
          return Boom.notFound("No POI with this id");
        }
        await db.poiStore?.deletePOIById(poi._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No POI with this id");
      }
    },
  },
};
