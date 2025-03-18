import express, {Request} from 'express';
import userRepository from '../repositories/userRepository';
import JwtCreate from '../utils/jwtCreate';
import userUsecase from '../../useCase/userUsecase';
import userController from '../../adapter/userController';
import Encrypt from '../utils/hashPassword';

const repository = new userRepository()
const jwt = new JwtCreate()
const encrypt = new Encrypt()
const usecase = new userUsecase(repository,encrypt,jwt)
const controller = new userController(usecase)

const userRoutes = express.Router()

userRoutes.post('/signup',(req:Request,res)=>{controller.signUp(req,res)})
userRoutes.post('/login',(req:Request,res)=>{controller.login(req,res)})

export default userRoutes

