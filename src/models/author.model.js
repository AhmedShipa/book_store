import mongoose, { Schema, model } from "mongoose";
const schema = new Schema(
  {
    name: {
      type: String,
    },
    bio: String,
    birthDate: Date,
    email: String,
    password: String,
    books: {
      type: [mongoose.Types.ObjectId],
      ref: "Book",
    },
  },
  {
    versionKey: false,
  }
);
export const Author = model("Author", schema);
