import ProductController from "../../adapter/productController"
import ProductUsecase from "../../useCase/productUsecase"
import { Multer } from "../middlewares/multer"
import productRepository from "../repositories/productRepository"
import express, {Request} from "express"
import Cloudinary from "../utils/cloudinary"

const productRouter = express.Router()

//Product Management Routes
const cloudinary = new Cloudinary()
const productRepo = new productRepository()
const productUseCase = new ProductUsecase(cloudinary,productRepo)
const productController = new ProductController(productUseCase)

productRouter.get('/product',(req:Request,res)=>{productController.getProducts(req,res)})
productRouter.post('/product',Multer,(req:Request,res)=>{productController.addProduct(req,res)})

export default productRouter