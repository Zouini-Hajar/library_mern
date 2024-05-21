import { Schema, model } from "mongoose";

const BorrowSchema = Schema({
  book: {
    type: String,
    required: true,
  },
  client: {
    type: String,
    required: true,
  },
  borrowingDate: {
    type: Date,
    default: Date.now
  },
  returnDate: {
    type: Date,
    default: null
  }
});

export default model("borrow", BorrowSchema);
