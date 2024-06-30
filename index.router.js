import { dbConnection } from "./dbConnection/dbConnection.js";
import { authorRouter } from "./src/modules/author/author.routes.js";
import { bookRouter } from "./src/modules/book/book.routes.js";
import cors from "cors";

import express from "express";
export const indexRouter = (app) => {
  app.use(cors());
  app.use(express.json());
  app.use(authorRouter);
  app.use(bookRouter);
  app.use("*", (req, res) => {
    res.json({ message: "wrong path" });
  });
};
