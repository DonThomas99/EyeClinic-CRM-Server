import { Request,Response } from "express";
import userUsecase from "../useCase/userUsecase";
// import User from "../domain/user";

class userController {
    private userUsecase:userUsecase
    constructor(userUsecase:userUsecase){
        this.userUsecase = userUsecase;
    }
    //Authorization and Authentiacation of User
    async signUp(req:Request,res:Response){
        const user = req.body
        const response = await this.userUsecase.signUp(user)
        if(response)
        res.status(response.status).json({message:response.message})

    }
    async login(req:Request,res:Response){
        const userData = req.body
        const response = await this.userUsecase.login(userData)
        res.status(response.status).json({message:response.message,data:response.data,token:response.token})
    }

    //User Management Routes
    async customerList(req:Request, res:Response){
        try {
          const response = await this.userUsecase.fetchUsers()
          res.status(response.status).json({customers:response.data,message:response.message})
        } catch (error) {
          console.log(error)
        }
      }

    async toggleBlockStatus(req:Request, res:Response){
      try {
        const {userEmail} = req.body
        const response = await this.userUsecase.toggleBlockStatus(userEmail)
        res.status(response.status).json({message:response.message})
      } catch (error) {
        console.log(error)
      }
    } 
}
export default userController