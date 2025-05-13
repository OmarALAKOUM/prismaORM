import { getAllProducts, getProductbyTitle } from "../services/product.js";

export const getProducts = async (req, res) => {
  try {
    const products = await getAllProducts();
    res.json(products);
  } catch (err) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching products." });
  }
};
export const getProduct = async (req, res) => {
  const { q } = req.query;

  if (!q) {
    return res.status(400).json({ error: "Query parameter 'q' is required" });
  }

  try {
    const products = await getProductbyTitle(q);
    res.json(products);
  } catch (err) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching products." });
  }
};
