import UserRepository from "../../useCase/interfaces/userRepository";
import { IUser,User } from "../../domain/user"; 
import userModel from "../database/userModel";

class userRepository implements UserRepository{
async findByEmail(email:string):Promise<User | null>{
    try {
        const user = await userModel.findOne({email:email})
            return user as User | null
    } catch (error) {
        console.log(error)
        return null
    }
}

async addUser(user:IUser){
try {
        const save = await userModel.insertOne(user)
        console.log('repository',save)
        return save
} catch (error) {
    return false
}
}

async fetchAllUsers(){
    try {
        const users = await userModel.find({})
        return users
    } catch (error) {
        console.log(error)
    }
}



}
export default userRepository
