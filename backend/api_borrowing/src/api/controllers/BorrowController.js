import { configDotenv } from "dotenv";
import Borrow from "../models/Borrow.js";
import axios from "axios";

configDotenv();

const BOOK_SERVICE_URL = process.env.BOOK_SERVICE_URL;
const CLIENT_SERVICE_URL = process.env.CLIENT_SERVICE_URL;

export const getClientBorrows = (req, res) => {
  try {
    const { clientId } = req.params;

    const fetchClient = async (clientId) => {
      const response = await axios.get(`${CLIENT_SERVICE_URL}/${clientId}`);
      return response.data;
    };

    const fetchBook = async (bookId) => {
      const response = await axios.get(`${BOOK_SERVICE_URL}/${bookId}`);
      return response.data;
    };

    const fetchBorrowDetails = async (borrow) => {
      const [client, book] = await Promise.all([
        fetchClient(borrow.client),
        fetchBook(borrow.book),
      ]);
      return {
        borrow_id: borrow._id,
        borrowingdate: borrow.borrowingDate,
        returndate: borrow.returnDate,
        client: client,
        book: book,
      };
    };

    Borrow.find({ client: clientId })
      .then((borrows) => {
        if (borrows.length > 0) {
          Promise.all(borrows.map(fetchBorrowDetails))
            .then((borrowsWithDetails) => {
              res.status(200).json(borrowsWithDetails);
            })
            .catch((error) => console.log("Promise error:" + error));
        } else
          res.status(404).json({ message: "No borrows found for the client" });
      })
      .catch((err) => res.sendStatus(500));
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
};

export const addBorrow = (req, res) => {
  const { clientId, bookId } = req.body;
  console.log(req.body)
  
  if (!clientId || !bookId) {
    return res
      .status(400)
      .json({ message: "Client ID and Book ID are required" });
  }

  Borrow.create({ book: bookId, client: clientId })
    .then((newBorrow) => {
      res
        .status(200)
        .json({ message: "Borrow added successfully", borrow: newBorrow });
    })
    .catch((error) => {
      console.error("custom" + error);
      res.status(500).send("Internal Server Error");
    });
};

export const updateBorrow = async (req, res) => {
  const borrowId = req.body.borrowId;
  const returnDate = Date.now();

  Borrow.findOneAndUpdate(
    { _id: borrowId },
    { $set: { returnDate: returnDate } }
  )
    .then((borrow) => {
      if (!borrow)
        res
          .status(404)
          .json({ message: `No borrow found matching id ${borrowId}` });
      else res.status(200).json({ message: "Book updated successfully" });
    })
    .catch((err) => res.sendStatus(500));
};
