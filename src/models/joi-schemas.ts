import Joi, { CustomHelpers } from "joi";

export const UserSpec = {
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
};

export const UserCredentialsSpec = {
  email: Joi.string().email().required(),
  password: Joi.string().required(),
};

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
