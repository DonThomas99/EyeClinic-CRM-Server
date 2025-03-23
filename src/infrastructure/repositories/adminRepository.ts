import { Admin } from "../../domain/admin";
import AdminModel from "../database/adminModel";
import AdminRepository from "../../useCase/interfaces/adminRepository";

class adminRepository implements AdminRepository {
    constructor() { }
    async findByEmail(email: string): Promise<Admin | null> {
        const admin = await AdminModel.findOne({ email: email });
        return admin;
    }   
}

export default adminRepository;
