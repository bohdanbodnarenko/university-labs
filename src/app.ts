import "reflect-metadata";
import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";

import { createTypeormConn } from "./utils/createTypeormConn";
import { studentRouter } from "./routes/studentRoutes";
import { authRouter } from "./routes/authRoutes";

dotenv.config();
const startServer = async () => {
  const app = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cors());

  app.use("/student", studentRouter);
  app.use("/", authRouter);

  await createTypeormConn();
  const port = process.env.PORT || 4000;
  app.listen(port, () =>
    console.log(`App is running on: http://localhost:${port}`)
  );
};

startServer();
