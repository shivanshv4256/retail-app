const express = require("express");
const app = express();

app.use(express.json());

// In-memory product store with initial data
const products = [
  { id: 1, name: "Laptop", price: 999.99 },
  { id: 2, name: "Mouse", price: 29.99 },
];

// GET /products - return all products
app.get("/products", (req, res) => {
  res.status(200).json(products);
});

// POST /products - create a new product
app.post("/products", (req, res) => {
  const newProduct = {
    id: products.length + 1,
    name: req.body.name,
    price: req.body.price,
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// Only start listening if this file is run directly (not imported by tests)
if (require.main === module) {
  app.listen(3000, () => {
    console.log("Server running on port 3000");
  });
}

module.exports = app;