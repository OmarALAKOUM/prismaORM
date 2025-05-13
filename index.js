import express from "express";
import dotenv from "dotenv";
import products from './src/routes/produt.js'
const app = express();
app.use(express.json());
dotenv.config();
const PORT = 3000;
app.use(products);
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
