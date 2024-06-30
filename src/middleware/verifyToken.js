import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  const token = req.headers.token;
  jwt.verify(token, "token", async (err, decoded) => {
    if (err) return res.json({ message: "invalid token" });
    next();
  });
};
