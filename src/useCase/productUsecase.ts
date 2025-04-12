import { IProduct, product, ProductResponse } from "../domain/product";
import productRepository from "../infrastructure/repositories/productRepository";
import Cloudinary from "../infrastructure/utils/cloudinary";
class ProductUsecase{
    private readonly productRepository:productRepository
    constructor(
        private readonly cloudinary:Cloudinary,
    productRepository:productRepository,
    
){
    this.productRepository = productRepository
}
    async addProduct(product:product,files:File[]):Promise<ProductResponse>{
        try {
            
            if(!files || !Array.isArray(files)){
                return {
                    status:401,
                    message:'Invalid Details',
                    data:null
                }
            }
            const uploadImages = await Promise.all(
                files.map(async(file:any)=>{
                    try {
                        return await this.cloudinary.savetoCloudinary(file)
                    } catch (error) {
                        console.log('cloudinaryError',error);
                        return null
                    }
                })
            )
            let file = uploadImages.filter((file)=>file != null)

            if(file.length ===0 ){
                return {
                    status:400,
                    message:'Invalid Images Found',
                    data:null
                }
            }
                const isExisting = await this.productRepository.productByName(product.name)
            if(isExisting){
                return {
                    status:309,
                    message:'Product Already Exists',
                    data:null
                }
            }else{
                
                const save = await this.productRepository.addProducts(product,file)
                
                if(save){
                    return {
                        status:200,
                        message:'Successfully Added Product',
                        data:save
                    }
                }else{
                    return {
                        status:401,
                        message:'Error Adding Product',
                        data:null
                    }
                }
            }
        } catch (error) {
            console.log(error);
            return {
                status:500,
                message:'Error Adding Product',
                data:null
            }
        }
    }

    async fetchProducts(){
        try {
            const products = await this.productRepository.fetchProducts()
            if(products && products.length>0){
                return {
                    status:200,
                    data:products,
                    message:'Success fetched Products'
                }
            }else{
                return {
                    status:200,
                    data:null,
                    message:'No Products found'
                }
            }
        } catch (error) {
            console.log(error);
            return {
                status:500,
                message:'Error Fetchng Products'
            }
        }
    }
}

export default ProductUsecase;