import express, { urlencoded } from "express";
import mongoose from "mongoose";
import "dotenv/config";

//Models
import Product from "./models/product.model.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get('/', (req, res) => {
  res.send("NodeJS server API");
});

//Get all products
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Find product by ID
app.get('/api/product/:id', async (req, res) => {
  try{
    // ID Parameter
    const { id } = req.params;
    const product = await Product.findById(id);
    if(!product){
      return res.status(404).json({message: "Product not found"});
    }
    res.status(200).json(product);
  }
  catch(error){
    res.status(500).json({message: error.message});
  }
});

// Create a product in the Database
app.post('/api/products', async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a product in the database
app.put('/api/product/:id', async (req, res) => {
  try{
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);
    if(!product){
      return res.status(404).json({message: "Product not found"});
    }
    const productupdate = await Product.findById(id);
    res.status(200).json(productupdate);
  }
  catch(error){
    res.status(500).json({message: error.message});
  }
});

// Delete a product in the database
app.delete('/api/product/:id', async (req, res) => {
  try{
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if(!product){
      return res.status(404).json({message: "Product not found"});
    }
    res.status(200).json({message: "Product deleted successfully"});
  }
  catch(error){
    res.status(500).json({message: error.message});
  }
});

//Connect to mongodb
mongoose.connect(process.env.CON_STRING)
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
