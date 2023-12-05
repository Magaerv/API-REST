import { Router } from "express";
const productRouter = Router();
import { _dirname } from "../utils.js";

import ProductManager from "../managers/productManager.js";
const productMgr = new ProductManager(_dirname + "/files/products.json");


productRouter.get("/", async (req, res) => {
  console.log(req.query)
  const { limit } = req.query;
  const productList = await productMgr.getProducts(limit);
  res.json(productList)
})

productRouter.get("/:id", async (req, res) => {
  const { id } = req.params
  const productFound = await productMgr.getProductById(parseInt(id));
  res.json(productFound)
})

productRouter.post("/", async (re, res) => {
  try {
    const newProduct = await productMgr.addProduct(req.body);
    res.status(201).json({ status: "success", newProduct });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message })
  }
})

productRouter.put("/:id", async (req, res) => {
  try {
    const updateProduct = await productMgr.updateProduct(req.params, req.body);
    res.json({ status: "success", updateProduct });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message })
  }
})

productRouter.delete("/:id", async (req, res) => {
  try {
    const deletedProduct = await productMgr.deleteProduct(req.params);
    res.json({ status: "success", deletedProduct });
  } catch (error) {
    res.status(400).json({status:"error", message: error.message})
  }
})

export default productRouter;