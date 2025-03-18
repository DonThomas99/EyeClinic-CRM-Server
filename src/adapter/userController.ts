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
}
export default userController