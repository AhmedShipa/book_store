import express from "express";
import {
  deleteAuthor,
  getAuthorBySearch,
  getAuthors,
  getSingleAuthor,
  login,
  signUp,
  updateAuthor,
} from "./author.controller.js";
import { checkEmail, checkForLogin } from "../../middleware/check.js";
import { verifyToken } from "../../middleware/verifyToken.js";
export const authorRouter = express.Router();

authorRouter.route("/author").get(getAuthors).post(checkEmail, signUp);
authorRouter.get("/singleAuthor/:id", verifyToken, getSingleAuthor);
authorRouter.get("/searchAuthor", getAuthorBySearch);
authorRouter.post("/login", checkForLogin, login);
authorRouter
  .route("/author/:id")
  .put(checkEmail, updateAuthor)
  .delete(deleteAuthor);
