import { Request,Response } from "express";
import userUsecase from "../useCase/userUsecase";
// import User from "../domain/user";

class userController {
    private userUsecase:userUsecase
    constructor(userUsecase:userUsecase){
        this.userUsecase = userUsecase;
    }
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
}
export default userController