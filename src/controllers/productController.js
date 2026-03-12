let products = require("../data/products");

exports.getProducts = (req, res) => {
  res.json(products);
};

exports.addProduct = (req, res) => {

  const newProduct = {
    id: products.length + 1,
    name: req.body.name,
    price: req.body.price,
    stock: req.body.stock,
    image: req.body.image
  };

  products.push(newProduct);

  res.status(201).json(newProduct);
};
const orders = require("../data/orders");

exports.placeOrder = (req,res)=>{

const order = {
id:orders.length+1,
items:req.body.items,
total:req.body.total,
date:new Date()
};

orders.push(order);

res.json(order);
};

exports.getOrders = (req,res)=>{
res.json(orders);
};