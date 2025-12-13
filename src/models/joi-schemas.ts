import Joi, { CustomHelpers } from "joi";

export const UserSpec = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const UserCredentialsSpec = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

// UpdateSpecs are for validation of updates where empty fields are allowed
export const UserUpdateSpec = Joi.object({
  firstName: Joi.string().allow("").optional(),
  lastName: Joi.string().allow("").optional(),
  email: Joi.string().email().allow("").optional(),
  password: Joi.string().allow("").optional(),
});

export const CategorySpec = Joi.object({
  title: Joi.string().required(),
});

export const CategoryUpdateSpec = Joi.object({
  title: Joi.string().allow("").optional(),
});

const LocationSpec = Joi.object({
  lat: Joi.number().min(-90).max(90).required(),
  lng: Joi.number().min(-180).max(180).required(),
});

const FlatPointOfInterestSpec = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  lat: LocationSpec.extract("lat").required(),
  lng: LocationSpec.extract("lng").required(),
});

const FlatPointOfInterestUpdateSpec = Joi.object({
  name: Joi.string().allow("").optional(),
  description: Joi.string().allow("").optional(),
  lat: LocationSpec.extract("lat").allow("").empty("").optional(),
  lng: LocationSpec.extract("lng").allow("").empty("").optional(),
});

const transformPointOfInterest = (value: any, helpers: CustomHelpers) => {
  const { name, description, lat, lng } = value;

  return {
    name,
    description,
    location: {
      lat,
      lng,
    },
  };
};

export const PointOfInterestValidator = FlatPointOfInterestSpec.custom(transformPointOfInterest);
export const PointOfInterestUpdateValidator = FlatPointOfInterestUpdateSpec.custom(transformPointOfInterest);
