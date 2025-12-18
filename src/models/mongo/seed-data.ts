import { Role } from "../../types/user-types.js";

export const seedData = {
  users: {
    _model: "User",
    admin: {
      firstName: "Ad",
      lastName: "Min",
      email: "admin@mail.com",
      password: "secret",
      role: Role.Admin,
    },
    homer: {
      firstName: "Homer",
      lastName: "Simpson",
      email: "homer@simpson.com",
      password: "secret",
      role: Role.User,
    },
    marge: {
      firstName: "Marge",
      lastName: "Simpson",
      email: "marge@simpson.com",
      password: "secret",
      role: Role.User,
    },
  },
  categories: {
    _model: "Category",
    sites: {
      title: "Historic Sites",
      userID: "->users.homer",
    },
    nature: {
      title: "Nature & Outdoors",
      userID: "->users.homer",
    },
    routes: {
      title: "Scenic Routes",
      userID: "->users.homer",
    },
  },
  pointofinterests: {
    _model: "PointOfInterest",
    gate: {
      name: "Brandenburg Gate",
      description: "Iconic neoclassical triumphal arch in Berlin, symbolizing reunification.",
      location: {
        lat: "52.5163",
        lng: "13.3777",
      },
      categoryID: "->categories.sites",
    },
    road: {
      name: "Romantic Road (Würzburg)",
      description: "The northern starting point of Germany's most famous scenic route.",
      location: {
        lat: "49.7912",
        lng: "9.9535",
      },
      categoryID: "->categories.routes",
    },
    forest: {
      name: "The Black Forest (Freiburg)",
      description: "A large, forested mountain range in Baden-Württemberg.",
      location: {
        lat: "47.9990",
        lng: "7.8421",
      },
      categoryID: "->categories.nature",
    },
  },
};
