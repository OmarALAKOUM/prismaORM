import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import products from "./src/routes/produt.js";
const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();
const PORT = 3000;
// app.use(async (req, res, next) => {
//   await new Promise((resolve) => {
//     return setTimeout(resolve, 2000);
//   });
//   next();
// });
app.use(products);
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
