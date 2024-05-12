import { configDotenv } from "dotenv";
import axios from "axios";

configDotenv();

const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL;

const validateAccessToken = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader ? authHeader.split(" ")[1] : null;
    if (token == null) return res.sendStatus(401);

    await axios.post(`${AUTH_SERVICE_URL}/validate`, { token });
    next();
  } catch (error) {
    if (error.response && error.response.status === 403) {
      res.sendStatus(403);
    } else {
      console.log(error);
      res.sendStatus(500);
    }
  }
};

export default validateAccessToken;
