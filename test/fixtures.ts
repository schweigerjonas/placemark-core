import { CategoryDetails } from "../src/types/category-types.js";
import { PointOfInterestDetails } from "../src/types/poi-types.js";
import { Role, UserDetails } from "../src/types/user-types.js";

export const url = "http://localhost:3000";

export const maggie: UserDetails = {
  firstName: "Maggie",
  lastName: "Simpson",
  email: "maggie@simpson.com",
  password: "secret",
  role: Role.User,
};

export const testUsers: UserDetails[] = [
  {
    firstName: "Homer",
    lastName: "Simpson",
    email: "homer@simpson.com",
    password: "secret",
    role: Role.User,
  },
  {
    firstName: "Marge",
    lastName: "Simpson",
    email: "marge@simpson.com",
    password: "secret",
    role: Role.User,
  },
  {
    firstName: "Bart",
    lastName: "Simpson",
    email: "bart@simpson.com",
    password: "secret",
    role: Role.Admin,
  },
];

export const neuschwansteinCastle: PointOfInterestDetails = {
  name: "Neuschwanstein Castle",
  description: "A 19th-century Romanesque Revival palace built by King Ludwig II.",
  location: {
    lat: "47.4167",
    lng: "10.9833",
  },
  img: {
    url: "",
    publicID: "",
  },
};

export const testPOIs: PointOfInterestDetails[] = [
  {
    name: "Brandenburg Gate",
    description: "Iconic neoclassical triumphal arch in Berlin, symbolizing reunification.",
    location: {
      lat: "52.5163",
      lng: "13.3777",
    },
    img: {
      url: "",
      publicID: "",
    },
  },
  {
    name: "Romantic Road (Würzburg)",
    description: "The northern starting point of Germany's most famous scenic route.",
    location: {
      lat: "49.7912",
      lng: "9.9535",
    },
    img: {
      url: "",
      publicID: "",
    },
  },
  {
    name: "The Black Forest (Freiburg)",
    description: "A large, forested mountain range in Baden-Württemberg.",
    location: {
      lat: "47.9990",
      lng: "7.8421",
    },
    img: {
      url: "",
      publicID: "",
    },
  },
];

export const historicSites: CategoryDetails = {
  title: "Historic Sites",
  img: {
    url: "",
    publicID: "",
  },
};

export const testCategories: CategoryDetails[] = [
  {
    title: "Nature & Outdoors",
    img: {
      url: "",
      publicID: "",
    },
  },
  {
    title: "Museums & Galleries",
    img: {
      url: "",
      publicID: "",
    },
  },
  {
    title: "Local Cuisine",
    img: {
      url: "",
      publicID: "",
    },
  },
];
