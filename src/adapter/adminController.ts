import {Request,Response} from 'express';
import adminUsecase from '../useCase/adminUseCase';
import {IAdmin} from '../domain/admin';

class adminController{
    private adminUsecase:adminUsecase
    constructor(adminUsecase:adminUsecase){
        this.adminUsecase = adminUsecase;
    }
    async adminLogin(req:Request,res:Response){
      try {
        console.log('hee');
        const adminData:IAdmin = req.body
        const response = await this.adminUsecase.adminLogin(adminData)
        console.log('kopp',response)
        res.status(response.status).json({token:response.data,message:response.message})
      } catch (error) {
        console.log(error)
      }
    }
}
export default adminController