import {Request, Response } from 'express'
import adminUsecase from '../useCase/adminUseCase'

class productController {
    private adminUsecase: adminUsecase
    constructor(adminUsecase:adminUsecase){
        this.adminUsecase = adminUsecase
    }

    
    async addProduct(req:Request,res:Response){
        try {
          
        } catch (error) {
          console.log(error)
        }
      }
    
}

export default productController