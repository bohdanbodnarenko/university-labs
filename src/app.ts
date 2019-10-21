import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";

import { userRouter } from "./routes/userRoutes";
import { createTypeormConn } from "./utils/createTypeormConn";
dotenv.config();
const startServer = async () => {
  const app = express();

  app.use(helmet());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cors());

  app.use("/user", userRouter);
  await createTypeormConn();
  const port = process.env.PORT || 4000;
  app.listen(port, () =>
    console.log(`App is running on: http://localhost:${port}`)
  );
};

startServer();
