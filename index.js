import express from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken"
import { PrismaClient } from "./generated/prisma/index.js";
import { body, validationResult } from "express-validator";
const prisma = new PrismaClient();
const app = express();
const PORT = 3000;
app.use(express.json());
dotenv.config();
app.get("/products", async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: error.message });
  }
});

app.get("/products/search", async (req, res) => {
  const { q } = req.query;

  if (!q) {
    return res.status(400).json({ error: "Query parameter 'q' is required" });
  }

  try {
    const products =
      await prisma.$queryRaw`SELECT * FROM Product WHERE LOWER(title) LIKE ${
        "%" + q.toLowerCase() + "%"
      }`;

    if (products.length === 0) {
      return res
        .status(404)
        .json({ message: "No products found matching your search" });
    }

    res.json(products);
  } catch (error) {
    console.error("Error searching products:", error);
    res.status(500).json({ error: error.message });
  }
});

app.get("/products/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const productid = parseInt(id);
    console.log("product id ", productid);
    if (isNaN(productid)) {
      res.status(400).json({ error: "Invalid Product id" });
    }
    const product = await prisma.product.findUnique({
      where: { id: productid },
    });
    if (!product) {
      return res.status(400).json({ error: "product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("error", error);
  }
});

app.post(
  "/users",
  
  [
    body("firstName").optional().isString(),
    body("lastName").optional().isString(),
    body("phoneNo").notEmpty().withMessage("phoneNo is required").isString(),
    body("password")
      .isString()
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
    body("confirmPassword")
      .notEmpty()
      .withMessage("confirmPassword is required")
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Password confirmation does not match password");
        }
        return true;
      }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { firstName, lastName, phoneNo, password } = req.body;
    try {
      const existingUser = await prisma.user.findUnique({
        where: { phoneNo:phoneNo },
      });

      if (existingUser) {
        return res.status(409).json({ error: "Phone number already exists." });
      }

      const newUser = await prisma.user.create({
        data: {
          firstName,
          lastName,
          phoneNo,
          password,
          status: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });

      res.status(201).json({
        message: "User created successfully",
        id: newUser.id,
        phoneNo: newUser.phoneNo,
      });
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ error: error.message });
    }
  }
);

app.post('/login', [
    body('phoneNo').notEmpty().withMessage('phoneNo is required'),
    body('password').notEmpty().withMessage('Password is required'),
    body('confirmPassword').notEmpty().withMessage('confirmPassword is required').custom((value, { req }) => {
        if (value !== req.body.password) {
            console.log('Password confirmation does not match password');
            throw new Error('Password confirmation does not match password');
        }
        return true;
    }),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log('Validation errors:', errors.array());
        return res.status(422).json({ errors: errors.array() });
    }

    const { phoneNo, password } = req.body;

    try {
        const user = await prisma.user.findUnique({
            where: { phoneNo }
        });

        if (!user) {
            console.log('User not found');
            return res.status(401).json({ error: 'Invalid phone number or password' });
        }

        if (user.password !== password) {
            console.log('Invalid password');
            return res.status(401).json({ error: 'Invalid phone number or password' });
        }

        const token = jwt.sign(
            { userId: user.id},
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ token });
    } catch (error) {
        console.error('Error in login route:', error.message);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

app.post('/users/:userId/pettycash', [
    body('descript').notEmpty().withMessage('Description is required')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const { userId } = req.params;
    const { descript } = req.body;

    try {
        const pettycash = await prisma.pettyCash.findFirst({
            where: {
                userId: parseInt(userId),
                descript: descript
            }
        });
        if (pettycash) {
            return res.status(400).json({ error: 'Pettycash alray exist' });
        }

        const pettyCash = await prisma.pettyCash.create({
            data: {
                userId: parseInt(userId),
                descript,
                status:  1,
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        });

        res.status(201).json({ message: 'PettyCash created successfully', pettyCash });
    } catch (error) {
        console.error('Error creating pettycash:', error.message);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
