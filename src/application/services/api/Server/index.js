import express from "express";
import cors from "cors";
import "express-async-errors";
import "reflect-metadata";
import { environment } from "../../../config/environment/index.js";
import { errorHandler } from "../handlers/index.js";

const { API_PORT, DOMAIN, DATABASE_URL } = environment;

class Server {
  app = express();
  port = +API_PORT;
  domain = DOMAIN;

  constructor() {
    this.useConfig();
    this.useRoutes();
    this.useHandlers();
  }

  useConfig() {
    this.app.use(express.json());
    this.app.use(cors());
  }

  useRoutes() {}

  useHandlers() {
    this.app.use(errorHandler);
  }

  init() {
    this.app.listen(this.port, async () => {
      console.log(`API is running on: ${this.domain}`);
    });
  }
}

export { Server };
