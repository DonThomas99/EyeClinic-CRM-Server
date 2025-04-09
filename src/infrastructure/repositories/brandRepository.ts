import { brand, Obrand } from "../../domain/brand";
import brandModel from "../database/brandModel";

class brandRepository{
    constructor(){}

    async addBrand(brand:brand){
        try {
            const newBrand = new brandModel({name:brand.brandName})
            const save = await newBrand.save()
            return save as Obrand | false
        } catch (error) {
            console.log(error);
            return false
        }
    }
    
    async toggleBlock(brandId:string){
        try {
            const brand = await brandModel.findOne({_id:brandId})
            console.log(brand);
            if(brand){
                console.log(brand.isBlocked);
                brand.isBlocked = !brand.isBlocked
                const status = await brand.save() 
                return status 
            }else{
                return null
            }
        } catch (error) {
            console.log(error);
            return false
        }
    }

    async fetchBrand(brandId:string){
        try {
            const brand = await brandModel.findById({_id:brandId})
            return brand  
        } catch (error) {
            console.log(error);
            return null
        }
    }

    async fetchBrandByName(brandName:string){
        try {
            const brand = await brandModel.findOne({name:brandName})
            if(brand){
                return true
            }else{
                return false
            }
        } catch (error) {
            console.log(error);
            return true
        }
    }

    async fetchAll(){
        try {
    const brands = await brandModel.find({})
    return brands            
        } catch (error) {
            console.log(error);
            return null
        }
    }
}

export default brandRepository