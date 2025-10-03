import express from "express";
//Models
import {getProducts, getProduct, addProduct, editProduct, deleteProduct} from "../controllers/product.controller.js";
const router = express.Router();

router.get('/', getProducts);

router.get('/:id', getProduct);

router.post('/', addProduct);

router.put('/:id', editProduct);

router.delete('/:id', deleteProduct);

export default router;