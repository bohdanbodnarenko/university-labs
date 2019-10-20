import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";

import { userRouter } from "./routes/userRoutes";

export const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
dotenv.config();
app.use(cors());

app.use("/user", userRouter);

createConnection()
  .then(() => {
    const port = process.env.PORT || 4000;
    app.listen(port, () =>
      console.log(`App is running on: http://localhost:${port}`)
    );
  })
  .catch(error => console.log(error));
