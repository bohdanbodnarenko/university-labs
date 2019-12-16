import "reflect-metadata";
import "reflect-metadata";
import express, { Response } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";

import { createTypeormConn } from "./utils/createTypeormConn";
import { studentRouter } from "./routes/studentRoutes";
import { authRouter } from "./routes/authRoutes";
import { teacherRouter } from "./routes/teacherRoutes";
import { channelRouter } from "./routes/channelRoutes";
import { postRoutes } from "./routes/postRoutes";
import { fieldOfStudyRouter } from "./routes/fieldOfStudyRoutes";
import { FieldOfStudy } from "./entity/FieldOfStudy";

dotenv.config();
const startServer = async () => {
  const app = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cors());

  app.use("/", authRouter);
  app.use("/student", studentRouter);
  app.use("/teacher", teacherRouter);
  app.use("/channel", channelRouter);
  app.use("/fos", fieldOfStudyRouter);
  app.use("/post", postRoutes);

  app.get("/docs", (_, res: Response) => {
    res.sendFile(path.join(__dirname + "/docs/index.html"));
  });

  await FieldOfStudy.clear()

  await createTypeormConn();
  const port = process.env.PORT || 4000;
  app.listen(port, () =>
    console.log(`App is running on: http://localhost:${port}`)
  );
};

startServer();
