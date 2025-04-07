import { brand, Obrand } from "../domain/brand";
import brandRepository from "../infrastructure/repositories/brandRepository"

class brandUsecase{
    private readonly brandRepository:brandRepository
    constructor(brandRepository:brandRepository){
        this.brandRepository = brandRepository
    }
    async fetchBrands(){
        try {
            const brandList = await this.brandRepository.fetchAll()
            if(brandList && brandList.length>0){
                return {
                    status:200,
                    data:brandList
                }
            }else{
                return {
                    status:200,
                    data:null,
                    message:'No brands found'
                }
            }
        } catch (error) {
            console.log(error);
            return{
                status:500,
                message:'Error fetching brands'
            }
        }
    }

    async addBrand(brand:brand){
        try {
            const brandExisting = await this.brandRepository.fetchBrandByName(brand.name)
            let save:Obrand | false
            if(!brandExisting){
                 save = await this.brandRepository.addBrand(brand)
            }else{
                save = false
                return {
                    status:309,
                    message:'Brand Already Existing!!'
                }
            }
            
            if(save){
                return {
                    status:200,
                    data:save
                }
            }else{
                return {
                    status:200,
                    data:null
                }
            }
            
        } catch (error) {
            console.log(error);
            return {
                status:500,
                message:'Error Adding branch'
            }
        }
    }

    async toggleBlock(brandId:string){
        try {
            const brandExisting = await this.brandRepository.fetchBrand(brandId)
            if(brandExisting){
                const toggle = await this.brandRepository.toggleBlock(brandId)
                if(toggle){
                    return {
                        status:200,
                        message:'Brand toggled successfully'
                    }
                }else{
                    return {
                        status:401,
                        message:'Error toggling status'
                    }
                }
            }else{
                return{
                    status:400,
                    message:'Brand not found'
                }
            }
        } catch (error) {
            console.log(error);
            return {
                status:500,
                message:'Error Toggling Block'
            }
        }
    }

}
export default brandUsecase
