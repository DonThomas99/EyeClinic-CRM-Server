import { IAdmin,Admin } from "../domain/admin";
import JwtCreate from "../infrastructure/utils/jwtCreate";
import adminRepository from "../infrastructure/repositories/adminRepository";


class adminUsecase{
    
    private adminRepository:adminRepository
    private JwtCreate:JwtCreate
constructor(adminRepository:adminRepository,JwtCreate:JwtCreate){
this.adminRepository = adminRepository
this.JwtCreate = JwtCreate
}

async adminLogin(adminData:IAdmin){
    const admin:Admin |null = await this.adminRepository.findByEmail(adminData.email)
    let token:string =''
    if(admin){
        if(admin.id){
             token =  this.JwtCreate.createJwt(admin.id)
        }
        else{
            return {
                status:404,message:'Admin Not Found'}
        }
            if(adminData.password == admin.password){
                return {status:200,data:token,message:'Successfully Logged in'}
            }else{
                return{status:401,data:null,message:'Wrong password'}
            }
    }else{
        return {status:401,data:null,message:"Invalid credentials"}
    }
}

}

export default adminUsecase
