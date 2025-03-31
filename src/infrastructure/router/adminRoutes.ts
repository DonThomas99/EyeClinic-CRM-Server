import express, {Request} from 'express';
const router = express.Router()

import adminRepository from '../repositories/adminRepository';
import adminController from '../../adapter/adminController';
import userController from '../../adapter/userController';
import adminUsecase from '../../useCase/adminUseCase';
import JwtCreate from '../utils/jwtCreate';
import productRepository from '../repositories/productRepository';
import userUsecase from '../../useCase/userUsecase';
import userRepository from '../repositories/userRepository';
import Encrypt from '../utils/hashPassword';
import CategoryController from '../../adapter/categoryController';
import CategoryUsecase from '../../useCase/categoryUsecase';
import categoryRepository from '../repositories/categoryRepository';

const jwt = new JwtCreate()
const encrypt = new Encrypt()
const adminRepo = new adminRepository()
const userRepo = new userRepository()
const UserUsecase = new userUsecase(userRepo,encrypt,jwt)
const AdminUsecase = new adminUsecase(adminRepo,jwt)
const Admincontroller = new adminController(AdminUsecase)
const UserController  = new userController(UserUsecase)
const categoryRepo = new categoryRepository()
const categoryUsecase = new CategoryUsecase(categoryRepo)
const categoryController = new CategoryController(categoryUsecase)


const adminRoutes = express.Router()
//admin authorization routes
adminRoutes.post('/login',(req:Request,res)=>{Admincontroller.adminLogin(req,res)})

//customer management routes
adminRoutes.get('/customers',(req:Request,res)=>{UserController.customerList(req,res)})

//category management routes
adminRoutes.get('/category',(req:Request,res)=>{categoryController.getCategory(req,res)})
adminRoutes.post('/category',(req:Request,res)=>{categoryController.addCategory(req,res)})

adminRoutes.put('/category',(req:Request,res)=>{categoryController.toggleBlock(req,res)})

//product management routes

//

export default adminRoutes