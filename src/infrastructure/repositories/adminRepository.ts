import {Admin} from "../../domain/admin";
import AdminModel from "../database/adminModel";
import userModel from "../database/userModel";
import staffModel from "../database/staffModel";
import AdminRepository from "../../useCase/interfaces/adminRepository";


class adminRepository implements AdminRepository{
async findByEmail(email:string):Promise<Admin |null>{
    const admin = await AdminModel.findOne({email:email})
    return admin
}
async customerList(){
    const customerList = await userModel.find({})
        return customerList
}
}

export default adminRepository