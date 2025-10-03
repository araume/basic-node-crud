import Product from "../models/product.model.js";


// List all products
export const getProducts = async (req, res) => {
      try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a specific Product
export const getProduct = async (req, res) => {
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
};

// Add a product
export const addProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a product
export const editProduct = async (req, res) => {
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
};

// Delete a product
export const deleteProduct = async (req, res) => {
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
}
