const express = require("express");
const mongoose = require("mongoose");
const http = require("http");
const path = require("path");
const createError = require("http-errors");
const { AllRoutes } = require("./routers/router");
const morgan = require("morgan");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const cors = require("cors");
const app = express();

class Application {
  constructor(PORT, DB_URL) {
    this.createServer(PORT);
    this.configDatabase(DB_URL);
    this.configAplication();
    this.createRoutes();
    this.errorHandler();
    this.initRedis();
  }

  configAplication() {
    app.use(cors());
    app.use(morgan("dev"));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static(path.join(__dirname, "..", "public")));
    app.use(
      "/api-doc",
      swaggerUI.serve,
      swaggerUI.setup(
        swaggerJsDoc({
          swaggerDefinition: {
            info: {
              title: "onlineshop",
              version: "0.0.1",
              description: "onlineshop with nodejs",
            },
            servers: [
              {
                uri: "http://localhost:5000",
              },
            ],
          },
          apis: ["./app/routers/**/*.js"],
        })
      )
    );
  }
  createServer(PORT) {
    const server = http.createServer(app);
    server.listen(PORT, () => {
      console.log(`Server Run On POrt ${PORT}`);
    });
  }
  configDatabase(DB_URL) {
    mongoose.connect(DB_URL, (error) => {
      if (error) throw error;
      return console.log("Connected to db");
    });
    mongoose.connection.on("connected", () => {
      console.log("connect to db now");
    });
    mongoose.connection.on("disconnected", () => {
      console.log("connect to db now");
    });
    process.on("SIGINT", async () => {
      await mongoose.connection.close();
      console.log("connection close");
      process.exit(0);
    });
  }
  createRoutes() {
    app.use(AllRoutes);
  }

  initRedis() {
    require("./utils/redis_init");
  }
  errorHandler() {
    app.use((req, res, next) => {
      next(createError.NotFound("صفحه موردنظر یافت نشد!!"));
    });

    app.use((error, req, res, next) => {
      const serverErrors = createError.InternalServerError();
      const statusCode = error.statusCode || serverErrors.status;
      const message = error.message || serverErrors.message;
      return res.status(statusCode).json({
        errors: {
          statusCode,
          message,
        },
      });
    });
  }
}

module.exports = Application;
