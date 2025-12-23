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
}).label("UserUpdateDetails");

const ImageSpec = Joi.object({
  url: Joi.string().uri().example("https://res.cloudinary.com/demo/image/upload/sample.jpg").required(),
  publicID: IDSpec,
}).label("ImageDetails");

export const ImageArray = Joi.array().items(ImageSpec).label("ImageArray");

export const CategorySpec = Joi.object()
  .keys({
    title: Joi.string().example("Historic Sites").required(),
    img: ImageSpec.optional(),
    userID: IDSpec.optional(),
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
}).label("CategoryUpdateDetails");

// const LocationSpec = Joi.object({
//   lat: Joi.number().min(-90).max(90).required(),
//   lng: Joi.number().min(-180).max(180).required(),
// }).label("LocationDetails");

const transformPointOfInterest = (value: any, helpers: CustomHelpers) => {
  const { name, description, lat, lng, img } = value;

  return {
    name,
    description,
    location: {
      lat,
      lng,
    },
    img,
  };
};

export const PointOfInterestSpec = Joi.object()
  .keys({
    name: Joi.string().example("Brandenburg Gate").required(),
    description: Joi.string().example("Iconic neoclassical triumphal arch in Berlin, symbolizing reunification.").required(),
    lat: Joi.number().min(-90).max(90).example(52.5163).required(),
    lng: Joi.number().min(-180).max(180).example(13.3777).required(),
    img: ImageSpec.optional(),
    categoryID: IDSpec.optional(),
  })
  .custom(transformPointOfInterest)
  .label("PointOfInterestDetails");

export const PointOfInterestSpecPlus = PointOfInterestSpec.keys({
  _id: IDSpec,
  __v: Joi.number(),
}).label("PointOfInterestDetailsPlus");

export const PointOfInterestArray = Joi.array().items(PointOfInterestSpecPlus).label("PointOfInterestArray");

export const PointOfInterestUpdateSpec = Joi.object()
  .keys({
    name: Joi.string().example("Brandenburg Gate").allow("").optional(),
    description: Joi.string().example("Iconic neoclassical triumphal arch in Berlin, symbolizing reunification.").allow("").optional(),
    lat: Joi.number().min(-90).max(90).example(52.5163).allow("").empty("").optional(),
    lng: Joi.number().min(-90).max(90).example(13.3777).allow("").empty("").required(),
    img: ImageSpec.optional(),
  })
  .custom(transformPointOfInterest)
  .label("PointOfInterestUpdateDetails");
