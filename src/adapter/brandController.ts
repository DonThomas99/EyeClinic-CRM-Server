import  {Request,Response} from 'express'
import brandUsecase from '../useCase/brandUsecase'
import { brand } from '../domain/brand';

class BrandController{
    private brandUsecase:brandUsecase;
    constructor(BrandUsecase:brandUsecase){
        this.brandUsecase = BrandUsecase
    }
    async getBrand(req:Request,res:Response){
        try {
            const response = await this.brandUsecase.fetchBrands()
            res.status(response.status).json({message:response.message,data:response.data})
        } catch (error) {
            console.log(error);
            res.status(500).json({message:'Error fetching Brands'})
        }
    }

    async addBrand(req:Request, res:Response){
        try {
            let brand:brand
            brand = req.body
            console.log(brand);
            const response = await this.brandUsecase.addBrand(brand)
            res.status(response.status).json({message:response.message,data:response.data})
        } catch (error) {
            console.log(error);
            res.status(500).json({message:'Error Adding Brand'})
        }
    }

    async toggleBlock(req:Request, res:Response){
        try {
            const brandId = req.body.brandId
            const response =  await this.brandUsecase.toggleBlock(brandId)
            res.status(response.status).json({message:response.message})
        } catch (error) {
            console.log(error);
            res.status(500).json({message:'Error Toggling Status'})
        }
    }
}
export default BrandController