import express from "express";
import cors from "cors";
import logger from "./utils/logger.js";
import morgan from "morgan";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

//Common middleware
app.use(express.json({ limit: "16Kb" }));
app.use(express.urlencoded({ extended: true, limit: "16Kb" }));
app.use(express.static("public"));

//logger
const morganFormat = ":method :url :status :response-time ms";
app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => {
        const logObject = {
          method: message.split(" ")[0],
          url: message.split(" ")[1],
          status: message.split(" ")[2],
          responseTime: message.split(" ")[3],
        };
        logger.info(JSON.stringify(logObject));
      },
    },
  })
);

//import routes
import healthcheckRouter from "./Routes/v1/healthcheck.routes.js";

//routes
app.use("/api/v1/healthcheck", healthcheckRouter);

export { app };
