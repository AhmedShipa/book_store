import express from "express";
import {
  addBook,
  deleteBook,
  getBooks,
  getBooksBySearch,
  getSingleBook,
  updateBook,
} from "./book.controller.js";
export const bookRouter = express.Router();

bookRouter.route("/book").get(getBooks).post(addBook);
bookRouter.get("/singleBook/:id", getSingleBook);
bookRouter.route("/book/:id").put(updateBook).delete(deleteBook);
bookRouter.get("/searchBook", getBooksBySearch);
