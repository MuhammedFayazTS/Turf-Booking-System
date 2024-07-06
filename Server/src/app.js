import express from "express";
import cors from "cors";
import logger from "./utils/logger.js";
import morgan from "morgan";
import cookieParser from "cookie-parser";

const app = express();

//cors middleware
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
app.use(cookieParser());

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
import authRouter from "./Routes/v1/auth.routes.js";
import turfRouter from "./Routes/v1/turf.routes.js";
import userRouter from "./Routes/v1/user.routes.js";
import adminRouter from "./Routes/v1/admin.routes.js";

//routes
app.use("/api/v1/healthcheck", healthcheckRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/turf", turfRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter);

export { app };
