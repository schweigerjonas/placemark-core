import Boom from "@hapi/boom";
import { Request, ResponseToolkit } from "@hapi/hapi";
import { db } from "../models/db.js";
import { PointOfInterestDetails } from "../types/poi-types.js";
import {
  IDSpec,
  PointOfInterestArray,
  PointOfInterestSpecPlus,
  PointOfInterestUpdateValidator,
  PointOfInterestValidator,
} from "../models/joi-schemas.js";
import { validationError } from "./logger.js";

export const poiApi = {
  create: {
    auth: false,
    handler: async function (request: Request, h: ResponseToolkit) {
      try {
        const poi = await db.poiStore?.addPOI(
          request.params.id,
          request.payload as PointOfInterestDetails
        );
        if (poi) {
          return h.response(poi).code(201);
        }
        return Boom.badImplementation("error creating POI");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Create a POI",
    notes: "Returns created POI",
    validate: { payload: PointOfInterestValidator, failAction: validationError },
    response: { schema: PointOfInterestSpecPlus, failAction: validationError },
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
    tags: ["api"],
    description: "Get all POIs",
    notes: "Returns details of all POIs",
    response: { schema: PointOfInterestArray, failAction: validationError },
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
    tags: ["api"],
    description: "Get a specific POI",
    notes: "Returns POI details",
    validate: { params: { id: IDSpec }, failAction: validationError },
    response: { schema: PointOfInterestSpecPlus, failAction: validationError },
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
    tags: ["api"],
    description: "Update an existing POI",
    notes: "Updates the POI",
    validate: {
      params: { id: IDSpec },
      payload: PointOfInterestUpdateValidator,
      failAction: validationError,
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
    tags: ["api"],
    description: "Delete all POIs",
    notes: "Removes all POIs",
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
    tags: ["api"],
    description: "Delete a specific POI",
    notes: "Removes a specific POI",
    validate: { params: { id: IDSpec }, failAction: validationError },
  },
};
