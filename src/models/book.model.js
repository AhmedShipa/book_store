import { Schema, model, version } from "mongoose";
const dateNow = new Date();
const schema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
      ref: "Author",
    },
    publishedDate: {
      type: Date,
      default: dateNow,
    },
  },
  {
    versionKey: false,
  }
);
export const Book = model("Book", schema);
