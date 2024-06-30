import { Author } from "../../models/author.model.js";
import { Book } from "../../models/book.model.js";

// add new book
const addBook = async (req, res) => {
  const books = await Book.insertMany(req.body);
  await Author.findOneAndUpdate(
    { _id: req.body.author },
    { $push: { books: books[0]._id } }
  );

  res.status(201).json({ message: "book added successfully", books });
};

// get all books
const getBooks = async (req, res) => {
  let { page = 1, limit = 10, search = "" } = req.query;
  page = parseInt(page);
  limit = parseInt(limit);
  try {
    const query = search
      ? { $or: [{ name: { $regex: search } }, { email: { $regex: search } }] }
      : {};

    const book = await Book.find(query)
      .limit(limit)
      .skip((page - 1) * limit)
      .populate("author", "name email");
    const count = await Book.countDocuments(query);
    res.status(201).json({
      book,
      totalPages: Math.round(count / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// get single book
const getSingleBook = async (req, res) => {
  const book = await Book.findById(req.params.id).populate(
    "author",
    "name email"
  );
  res.status(200).json({ book });
};

// update book
const updateBook = async (req, res) => {
  const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(201).json({ message: "book updated successfully", book });
};

// delete book
const deleteBook = async (req, res) => {
  await Book.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "book deleted successfully" });
};

//search functionality for books
const getBooksBySearch = async (req, res) => {
  const books = await Book.find({
    $or: [{ title: req.query.title }, { author: req.query.author }],
  });
  res.json(books);
};
export {
  addBook,
  getBooks,
  getSingleBook,
  updateBook,
  deleteBook,
  getBooksBySearch,
};
