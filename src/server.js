import express from "express";
import productRouter from "./routes/productRouter.js";
const server = express();

const PORT = 3000

server.use("/api/products", productRouter);

server.listen(PORT, () => {
  try {
    console.log(`server listening on port ${PORT}\nEnter to:`);
    console.log(`\t1), http://localhost:${PORT}/api/products`);
    console.log(`\t2), http://localhost:${PORT}/api/carts`)
  } catch (error) {
    console.log(error)
  }
})