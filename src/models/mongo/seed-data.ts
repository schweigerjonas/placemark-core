import { Role } from "../../types/user-types.js";

export const seedData = {
  users: {
    _model: "User",
    admin: {
      firstName: "Ad",
      lastName: "Min",
      email: "admin@mail.com",
      password: "$2a$10$hs80q3Xc9QineM6z9xXK3ugRNNfRxbLp0POwFFTRnFGIKwzPhMJHO",
      role: Role.Admin,
    },
    homer: {
      firstName: "Homer",
      lastName: "Simpson",
      email: "homer@simpson.com",
      password: "$2a$10$1KtPUXBSM9Ie5B9pugxxReUqyLDJKrEYWNSrA.kua/3BQUwmoBJem",
      role: Role.User,
    },
    marge: {
      firstName: "Marge",
      lastName: "Simpson",
      email: "marge@simpson.com",
      password: "$2a$10$XwiNJAkK/O0le8WpPQQX3.nIy/DZ8Ib3MnI2cAHZjH9L/i05.HZTW",
      role: Role.User,
    },
  },
  categories: {
    _model: "Category",
    sites: {
      title: "Historic Sites",
      img: {
        url: "http://res.cloudinary.com/dif8elawf/image/upload/v1766220295/xyhpmoohwdhnrbxqtojd.png",
        publicID: "v1766220295",
      },
      userID: "->users.homer",
    },
    nature: {
      title: "Nature & Outdoors",
      img: {
        url: "http://res.cloudinary.com/dif8elawf/image/upload/v1766220306/cn7ypvwvfbjnnu3ddgoz.png",
        publicID: "v1766220306",
      },
      userID: "->users.homer",
    },
    routes: {
      title: "Scenic Routes",
      img: {
        url: "http://res.cloudinary.com/dif8elawf/image/upload/v1766220316/qg7gtohkxouyee9g04en.png",
        publicID: "v1766220316",
      },
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
      img: {
        url: "",
        publicID: "",
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
      img: {
        url: "",
        publicID: "",
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
      img: {
        url: "",
        publicID: "",
      },
      categoryID: "->categories.nature",
    },
  },
};
