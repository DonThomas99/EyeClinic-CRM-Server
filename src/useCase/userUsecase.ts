import { IUser, User, userLogin } from "../domain/user";
import UserRepository from "../infrastructure/repositories/userRepository";
import Encrypt from "../infrastructure/utils/hashPassword"
import JwtCreate from "../infrastructure/utils/jwtCreate";

class userUsecase{
    private UserRepository:UserRepository
        private JwtCreate:JwtCreate
    private Encrypt:Encrypt
    constructor(UserRepository:UserRepository,Encrypt:Encrypt,jwtCreate:JwtCreate){
        this.JwtCreate =jwtCreate
        this.UserRepository = UserRepository
        this.Encrypt = Encrypt
    }

//user registration and access control methods
    
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

    async login(userData:userLogin){
        try {
            let token =''
            const user = await this.UserRepository.findByEmail(userData.email)
            if(user){
                if(user.id){

                     token  = this.JwtCreate.createJwt(user.id)
                }
                return {
                    status:200,
                    message:'Successfully logged in!',
                    data:user,
                    token:token
                }
            }else{
                return {
                    status:401,
                    message:'Error Fetching details',
                    data:null,
                    token:null
                }
            }
        } catch (error) {
            console.log(error)
            return {
                status:401,
                message:'Error Fetching details',
                data:null,
                token:null
            }
        }
    }

    async fetchUsers(){
        try {
            const users = await this.UserRepository.fetchAllUsers()
            if(users && users.length > 0){
                return {
                    status:200,
                    data:users,
                    message:'Successfully fetched users'
                }
            }else{
                return {
                    status:200,
                    data:null,
                    message:'No users found'
                }
            }
        } catch (error) {
            console.log(error)
            return {
                status:500,
                message:'Error Fetching data. Try again details!',
                data:null
            }
        }
    }

}

export default userUsecase