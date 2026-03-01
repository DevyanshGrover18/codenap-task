import express from 'express'
import { addProduct, deleteProduct, getProducts, updateProduct } from '../controllers/productController.js';
import {verifyJWT} from '../middleware/verifyJWT.js'
const ProductRouter = express.Router();

ProductRouter.route('/').get(getProducts).post(verifyJWT, addProduct)
ProductRouter.route('/:id').put(verifyJWT, updateProduct).delete(verifyJWT, deleteProduct)

export default ProductRouter;