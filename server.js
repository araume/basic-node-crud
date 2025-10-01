import express from "express";
import mongoose from "mongoose";
import "dotenv/config";

//Models
import Product from "./models/product.model.js";

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send("Hello from NodeJS server API");
});

app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/product/:id', async (req, res) => {
  try{
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
  }
  catch(error){
    res.status(500).json({message: error.message});
  }
});

app.post('/api/products', async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Connect to mongodb
mongoose
  .connect(process.env.CON_STRING)
  .then(() => {
    console.log("Connected to the Database!");
    //connect to the server
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch(() => {
    console.log("Connection unsuccessful");
  });
