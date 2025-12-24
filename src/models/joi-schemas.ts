import Joi, { CustomHelpers } from "joi";

export const IDSpec = Joi.alternatives().try(Joi.string(), Joi.object()).description("valid ID");

export const JwtAuth = Joi.object()
  .keys({
    success: Joi.boolean().example("true").required(),
    name: Joi.string().example("Homer Simpson"),
    token: Joi.string()
      .example(
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5NGJhNDRiMzllNWFhMDNmMThhYzI2YyIsImVtYWlsIjoibmVkQGZsYW5kZXJzLmNvbSIsInNjb3BlIjpbXSwiaWF0IjoxNzY2NTY0OTY4LCJleHAiOjE3NjY1Njg1Njh9.LaNV3YJSche-vqNc8cM0XoqRjvkA-bLAWhhRqZvmG1c"
      )
      .required(),
    _id: IDSpec.required(),
  })
  .label("JWTAuthenticationDetails");

export const UserCredentialsSpec = Joi.object()
  .keys({
    email: Joi.string().email().example("homer@simpson.com").required(),
    password: Joi.string().example("secret").required(),
  })
  .label("UserCredentials");

export const SignupSpec = UserCredentialsSpec.keys({
  firstName: Joi.string().example("Homer").required(),
  lastName: Joi.string().example("Simpson").required(),
}).label("SignupDetails");

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
  url: Joi.string()
    .uri()
    .example("https://res.cloudinary.com/demo/image/upload/sample.jpg")
    .allow("")
    .required(),
  publicID: IDSpec.allow(""),
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

const LocationSpec = Joi.object({
  lat: Joi.number().min(-90).max(90).precision(6).example(52.5163).required(),
  lng: Joi.number().min(-180).max(180).precision(6).example(13.3777).required(),
}).label("LocationDetails");

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

const NestedPointOfInterestSpec = Joi.object()
  .keys({
    name: Joi.string().example("Brandenburg Gate").required(),
    description: Joi.string()
      .example("Iconic neoclassical triumphal arch in Berlin, symbolizing reunification.")
      .required(),
    location: LocationSpec.required(),
    img: ImageSpec.optional(),
    categoryID: IDSpec.optional(),
  })
  .label("NestedPointOfInterestDetails");

const FlatPointOfInterestSpec = Joi.object()
  .keys({
    name: Joi.string().example("Brandenburg Gate").required(),
    description: Joi.string()
      .example("Iconic neoclassical triumphal arch in Berlin, symbolizing reunification.")
      .required(),
    lat: Joi.number().min(-90).max(90).precision(6).example(52.5163).required(),
    lng: Joi.number().min(-180).max(180).precision(6).example(13.3777).required(),
    img: ImageSpec.optional(),
    categoryID: IDSpec.optional(),
  })
  .custom(transformPointOfInterest)
  .label("FlatPointOfInterestDetails");

export const PointOfInterestValidator = Joi.alternatives()
  .try(NestedPointOfInterestSpec, FlatPointOfInterestSpec)
  .label("PointOfInterestDetails");

export const PointOfInterestSpecPlus = Joi.object()
  .keys({
    name: Joi.string().example("Brandenburg Gate").required(),
    description: Joi.string()
      .example("Iconic neoclassical triumphal arch in Berlin, symbolizing reunification.")
      .required(),
    location: LocationSpec.required(),
    img: ImageSpec.optional(),
    categoryID: IDSpec.optional(),
    _id: IDSpec,
    __v: Joi.number(),
  })
  .label("PointOfInterestDetailsPlus");

export const PointOfInterestArray = Joi.array()
  .items(PointOfInterestSpecPlus)
  .label("PointOfInterestArray");

const NestedPointOfInterestUpdateSpec = Joi.object()
  .keys({
    name: Joi.string().example("Brandenburg Gate").allow("").optional(),
    description: Joi.string()
      .example("Iconic neoclassical triumphal arch in Berlin, symbolizing reunification.")
      .allow("")
      .optional(),
    location: LocationSpec.optional(),
    img: ImageSpec.optional(),
  })
  .label("NestedPointOfInterestUpdateSpec");

const FlatPointOfInterestUpdateSpec = Joi.object()
  .keys({
    name: Joi.string().example("Brandenburg Gate").allow("").optional(),
    description: Joi.string()
      .example("Iconic neoclassical triumphal arch in Berlin, symbolizing reunification.")
      .allow("")
      .optional(),
    lat: Joi.number().min(-90).max(90).precision(6).example(52.5163).allow("").empty("").optional(),
    lng: Joi.number().min(-90).max(90).precision(6).example(13.3777).allow("").empty("").required(),
    img: ImageSpec.optional(),
  })
  .custom(transformPointOfInterest)
  .label("FlatPointOfInterestUpdateDetails");

export const PointOfInterestUpdateValidator = Joi.alternatives()
  .try(NestedPointOfInterestUpdateSpec, FlatPointOfInterestUpdateSpec)
  .label("PointOfInterestUpdateDetails");
