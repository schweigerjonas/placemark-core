import Hapi from "@hapi/hapi";
import Vision from "@hapi/vision";
import Cookie from "@hapi/cookie";
import Handlebars from "handlebars";
import Joi from "joi";
import path from "path";
import dotenv from "dotenv";

import { fileURLToPath } from "url";
import { routes } from "./routes";
import { db } from "./models/db";
import { accountController } from "./controllers/account-controller";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function init() {
  const result = dotenv.config({ quiet: true });
  if (result.error) {
    console.log(result.error.message);
    process.exit(1);
  }

  const server = Hapi.server({
    port: process.env.PORT || 3000,
  });

  await server.register(Cookie);
  await server.register(Vision);
  server.auth.strategy("session", "cookie", {
    cookie: {
      name: process.env.COOKIE_NAME,
      password: process.env.COOKIE_PASSWORD,
      isSecure: false,
    },
    redirectTo: "/",
    validate: accountController.validate,
  });
  server.auth.default("session");
  server.views({
    engines: {
      hbs: Handlebars,
    },
    relativeTo: __dirname,
    path: "./views",
    layoutPath: "./views/layouts",
    partialsPath: "./views/partials",
    layout: true,
    isCached: false,
  });
  server.validator(Joi);
  db.init("json");
  server.route(routes);

  await server.start();
  console.log("Server running on %s", server.info.uri);
}

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
