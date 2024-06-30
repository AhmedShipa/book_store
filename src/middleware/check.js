import { Author } from "../models/author.model.js";
import bcrypt from "bcrypt";

//check email for signUp
export const checkEmail = async (req, res, next) => {
  const email = await Author.findOne({ email: req.body.email });
  if (email) return res.json({ message: "email already exists" });
  req.body.password = bcrypt.hashSync(String(req.body.password), 8);
  next();
};

//check email for login
export const checkForLogin = async (req, res, next) => {
  const author = await Author.findOne({ email: req.body.email });
  if (!author || !bcrypt.compareSync(String(req.body.password), author.password))
    return res.json({ message: "incorrect email or password" });
  next();
};
