import express, { urlencoded } from "express";
import mongoose from "mongoose";
import "dotenv/config";

//Models
import Product from "./models/product.model.js";

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// routes 
import router from "./routes/product.route.js";
app.use('/api/products', router);

app.get('/', (req, res) => {
  res.send("NodeJS server API");
});

//Get all products
app.get('/api/products', router);

// Find product by ID
app.get('/api/products/:id', router);

// Create a product in the Database
app.post('/api/products', router);

// Update a product in the database
app.put('/api/products/:id', router);

// Delete a product in the database
app.delete('/api/products/:id', router);

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
