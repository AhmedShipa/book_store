import { Author } from "../../models/author.model.js";
import { Book } from "../../models/book.model.js";
import jwt from "jsonwebtoken";

// signUp new author
const signUp = async (req, res) => {
  const author = await Author.insertMany(req.body);
  // hiding password in response
  author[0].password = undefined;
  res.status(201).json({ message: "author added successfully", author });
};

// login
const login = async (req, res) => {
  const author = await Author.findOne({ email: req.body.email });
  // setting token for author
  jwt.sign({ userId: author._id, name: author.name }, "token", (err, token) => {
    res.status(200).json({ message: "login", token });
  });
};

// get all authors
const getAuthors = async (req, res) => {
  // setting pagination
  let { page = 1, limit = 10, search = "" } = req.query;
  page = parseInt(page);
  limit = parseInt(limit);
  const query = search
    ? { $or: [{ name: { $regex: search } }, { email: { $regex: search } }] }
    : {};

  const author = await Author.find(query)
    .limit(limit)
    .skip((page - 1) * limit)
    .populate("books", "title content");
  const count = await Author.countDocuments(query);
  res.status(201).json({
    author,
    totalPages: Math.round(count / limit),
    currentPage: page,
  });
};

// get single author
const getSingleAuthor = async (req, res) => {
  const author = await Author.findById(req.params.id).populate("books");
  res.status(200).json({ author });
};

// update author
const updateAuthor = async (req, res) => {
  const author = await Author.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  // hiding password in response
  author.password = undefined;
  res.status(201).json({ message: "author updated successfully", author });
};

// delete author
const deleteAuthor = async (req, res) => {
  const author = await Author.findByIdAndDelete(req.params.id);
  // delete the book related to the author
  await Book.findByIdAndDelete(author.books);
  res.status(200).json({ message: "author deleted successfully", author });
};

//search functionality for author
const getAuthorBySearch = async (req, res) => {
  const author = await Author.find({
    $or: [{ name: req.query.name }, { bio: req.query.bio }],
  });
  res.json(author);
};
export {
  signUp,
  getAuthors,
  getSingleAuthor,
  updateAuthor,
  deleteAuthor,
  getAuthorBySearch,
  login,
};
