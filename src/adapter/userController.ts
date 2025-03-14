import { Request,Response } from "express";
import userUsecase from "../useCase/userUsecase";
import User from "../domain/user";

class userController {
    private userUsecase:userUsecase
    constructor(userUsecase:userUsecase){
        this.userUsecase = userUsecase;
    }
}
export default userController