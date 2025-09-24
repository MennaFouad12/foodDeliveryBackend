
// import jwt from "jsonwebtoken";


// const authMiddleware = async (req, res, next) => {
//   try {
//     const token = req.headers;
//     if(!token){
//       return res.status(400).json({ message: "User not found" });
//     }
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: error.message });
//   }
// };

// export default authMiddleware;


















import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.token;

    if (!token) {
      return res.status(401).json({ message: "Token missing" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // attach full decoded payload
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: "Invalid or expired token" });
  }
};

export default authMiddleware;
