const mongoose = require("mongoose");
const express = require("express");
const routes = express.Router();
const Product = require("../../models/Products.js");
const jwt = require("jsonwebtoken");
const app = express();
const {
  get_products,
  create_product,
  update_product,
  delete_product,
} = require("../../controller/products/products.controller.js");
// const ItemSchema = require("../../item.js")


  const authenticateToken = (req, res, next) => {
    // Get the token from the Authorization header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
      return res.sendStatus(401).json({msg:"unauthorized"}); // Unauthorized
    }
    
    // Verify the token
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403); // Forbidden
      }
      req.user = user;
      console.log(user);
      next();
    });
  };

routes.get("/get-products", authenticateToken, get_products);

routes.post("/created-products", authenticateToken, create_product);
routes.put("/products/:Id", authenticateToken, update_product);

routes.delete("/delete-product/:id", authenticateToken, delete_product);

module.exports = routes;
