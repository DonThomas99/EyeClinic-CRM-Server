import { IUser } from "../domain/user";
import UserRepository from "../infrastructure/repositories/userRepository";
import Encrypt from "../infrastructure/utils/hashPassword"

class userUsecase{
    private UserRepository:UserRepository
    private Encrypt:Encrypt
    constructor(UserRepository:UserRepository,Encrypt:Encrypt){
        this.UserRepository = UserRepository
        this.Encrypt = Encrypt
    }
    async signUp(user:IUser){
        try {
            const existingUser = await this.UserRepository.findByEmail(user.email)
            if(existingUser){
                return {
                    status:309,
                    message:"User already exists"
                }
             }

             const hashedPassword = await this.Encrypt.createHash(user.password)
             const saveUser = {
                name:user.name,
                email:user.email,
                mobile:user.mobile,
                password:hashedPassword

             }
             const save = await this.UserRepository.addUser(saveUser)
             if(save){
                return {
                    status:200,
                    message:'Registration successfull'
                }
             }

        } catch (error) {
            console.log(error)
            return {
                status:500,
                message:'Server Error Try again Later'
            }
        }
    }
}

export default userUsecase