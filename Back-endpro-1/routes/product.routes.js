import express from 'express'
import {createProduct, deleteProduct,  getAllProducts,  getProduct,  updateProduct} from '../Controllers/product.controller.js'
import  imageUpload from '../Middlewares/uploadimage.js'
import { authentication ,restrictTo} from '../Middlewares/auth.middleware.js'

let productRouter = express.Router()
productRouter.use(authentication)
productRouter.route('/').get(getAllProducts)
productRouter.route('/:id').get(getProduct)
productRouter.route('/create-product').post( imageUpload.single('image') , createProduct)
productRouter.route('/:id').delete(restrictTo('admin') , deleteProduct).patch(imageUpload.single('image') , updateProduct)
export default productRouter