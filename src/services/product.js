import { PrismaClient } from "../../generated/prisma/index.js";
const prisma = new PrismaClient();
export const getAllProducts = async () => {
  try {
    const products = await prisma.product.findMany();
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

export const getProductbyTitle = async (q) => {
  try {
    const products = await prisma.product.findMany({
      where: {
        title: {
          contains: q,
        },
      },
    });
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};
