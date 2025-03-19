import express, {Request} from 'express';
const router = express.Router()

import adminRepository from '../repositories/adminRepository';
import adminController from '../../adapter/adminController';
import adminUsecase from '../../useCase/adminUseCase';
import JwtCreate from '../utils/jwtCreate';

const repository = new adminRepository()
const jwt = new JwtCreate()
const usecase = new adminUsecase(repository,jwt)
const controller = new adminController(usecase)

const adminRoutes = express.Router()
//admin authorization routes
adminRoutes.post('/login',(req:Request,res)=>controller.adminLogin(req,res))

//customer management routes
adminRoutes.get('/customers',(req:Request,res)=>{controller.customerList(req,res)})

export default adminRoutes