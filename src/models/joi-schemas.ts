import Joi, { CustomHelpers } from "joi";

export const IDSpec = Joi.alternatives().try(Joi.string(), Joi.object()).description("valid ID");

export const UserCredentialsSpec = Joi.object()
  .keys({
    email: Joi.string().email().example("homer@simpson.com").required(),
    password: Joi.string().example("secret").required(),
  })
  .label("UserCredentials");

export const UserSpec = UserCredentialsSpec.keys({
  firstName: Joi.string().example("Homer").required(),
  lastName: Joi.string().example("Simpson").required(),
  role: Joi.string().example("USER").required(),
}).label("UserDetails");

export const UserSpecPlus = UserSpec.keys({
  _id: IDSpec,
  __v: Joi.number(),
}).label("UserDetailsPlus");

export const UserArray = Joi.array().items(UserSpecPlus).label("UserArray");

// UpdateSpecs are for validation of updates where empty fields are allowed
export const UserUpdateSpec = Joi.object({
  firstName: Joi.string().example("Homer").allow("").optional(),
  lastName: Joi.string().example("Simpson").allow("").optional(),
  email: Joi.string().email().example("homer@simpson.com").allow("").optional(),
  password: Joi.string().example("secret").allow("").optional(),
  role: Joi.string().example("USER").allow("").optional(),
});

const ImageSpec = Joi.object({
  url: Joi.string().uri().example("https://res.cloudinary.com/demo/image/upload/sample.jpg").required(),
  publicID: IDSpec,
}).label("ImageDetails");

export const CategorySpec = Joi.object()
  .keys({
    title: Joi.string().example("Historic Sites").required(),
    img: ImageSpec.optional(),
    userID: IDSpec,
  })
  .label("CategoryDetails");

export const CategorySpecPlus = CategorySpec.keys({
  _id: IDSpec,
  __v: Joi.number(),
}).label("CategoryDetailsPlus");

export const CategoryArray = Joi.array().items(CategorySpecPlus).label("CategoryArray");

export const CategoryUpdateSpec = Joi.object({
  title: Joi.string().example("Historic Sites").allow("").optional(),
  img: ImageSpec.optional(),
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
