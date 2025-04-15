import express, {Request} from 'express';
import adminRepository from '../repositories/adminRepository';
import adminController from '../../adapter/adminController';
import userController from '../../adapter/userController';
import adminUsecase from '../../useCase/adminUseCase';
import JwtCreate from '../utils/jwtCreate';
import userUsecase from '../../useCase/userUsecase';
import userRepository from '../repositories/userRepository';
import Encrypt from '../utils/hashPassword';
import CategoryController from '../../adapter/categoryController';
import CategoryUsecase from '../../useCase/categoryUsecase';
import categoryRepository from '../repositories/categoryRepository';
import BrandController from '../../adapter/brandController';
import brandRepository from '../repositories/brandRepository';
import brandUsecase from '../../useCase/brandUsecase';

const jwt = new JwtCreate()
const encrypt = new Encrypt()
const adminRoutes = express.Router()






//Admin Authorization Routes
const adminRepo = new adminRepository()
const AdminUsecase = new adminUsecase(adminRepo,jwt)
const Admincontroller = new adminController(AdminUsecase)

adminRoutes.post('/login',(req:Request,res)=>{Admincontroller.adminLogin(req,res)})

//Customer Management Routes
const userRepo = new userRepository()
const UserUsecase = new userUsecase(userRepo,encrypt,jwt)
const UserController  = new userController(UserUsecase)

adminRoutes.get('/customers',(req:Request,res)=>{UserController.customerList(req,res)})
adminRoutes.put('/customers',(req:Request,res)=>{UserController.toggleBlockStatus(req,res)})

//Category Management Routes

const categoryRepo = new categoryRepository()
const categoryUsecase = new CategoryUsecase(categoryRepo)
const categoryController = new CategoryController(categoryUsecase)

adminRoutes.get('/category',(req:Request,res)=>{categoryController.getCategory(req,res)})
adminRoutes.post('/category',(req:Request,res)=>{categoryController.addCategory(req,res)})
adminRoutes.put('/category',(req:Request,res)=>{categoryController.toggleBlock(req,res)})
adminRoutes.patch('/category',(req:Request,res)=>{categoryController})

//Brand Management Routes

const brandRepo = new brandRepository()
const brandUseCase = new brandUsecase(brandRepo)
const brandController    = new BrandController(brandUseCase)

adminRoutes.get('/brand',(req:Request,res)=>{brandController.getBrand(req,res)})
adminRoutes.post('/brand',(req:Request,res)=>{brandController.addBrand(req,res)})
adminRoutes.put('/brand',(req:Request,res)=>{brandController.toggleBlock(req,res)})



export default adminRoutes