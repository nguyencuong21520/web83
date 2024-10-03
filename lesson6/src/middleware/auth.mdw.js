import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../utils/key.js";
const authorizationToken = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      res.status(403).json({ message: "Missing Bearer token" });
    }

    const token = req.headers.authorization.split("Bearer ")[1];
    if (!token) {
      res.status(403).json({ message: "Invalid Bearer" });
    }

    const user = jwt.verify(token, SECRET_KEY);
    if (!user) {
      res.status(403).json({ message: "Invalid token" });
    }

    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};

export default authorizationToken;
