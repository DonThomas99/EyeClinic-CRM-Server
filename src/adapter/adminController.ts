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
        const adminData:IAdmin = req.body
        const response = await this.adminUsecase.adminLogin(adminData)
        res.status(response.status).json({token:response.data,message:response.message})
      } catch (error) {
        console.log(error)
      }
    }

    async customerList(req:Request, res:Response){
      try {
        const response = await this.adminUsecase.customerList()
        res.status(response.status).json({customers:response.data,message:response.message})
        
      } catch (error) {
        console.log(error)
      }
    }

}
export default adminController