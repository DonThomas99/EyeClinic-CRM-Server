import { brand, Obrand } from "../../domain/brand";
import brandModel from "../database/brandModel";

class brandRepository{
    constructor(){}

    async addBrand(brand:brand){
        try {
            const newBrand = new brandModel({name:brand.name, image:brand.image})
            const save = await newBrand.save()
            return save as Obrand | false
        } catch (error) {
            console.log(error);
            return false
        }
    }
    
    async toggleBlock(brandId:string){
        try {
            const brand = await brandModel.findOne({id:brandId})
            if(!brand)return null
            brand.isBlocked = !brand.isBlocked
            const status = await brand.save() 
                return status 
        } catch (error) {
            console.log(error);
            return false
        }
    }

    async fetchBrand(brandId:string){
        try {
            const brand = brandModel.findById({id:brandId})
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
    const brands = brandModel.find({})
    return brands            
        } catch (error) {
            console.log(error);
            return null
        }
    }
}

export default brandRepository