import {Request, Response } from 'express'
import productUsecase from '../useCase/productUsecase'
import { product,ProductResponse } from '../domain/product'

class ProductController {
    private productUsecase: productUsecase
    constructor(productUsecase:productUsecase){
        this.productUsecase = productUsecase
    }

    
    async addProduct(req:Request,res:Response){
        try {
          let product:product
           product = req.body
           const files = req.files as File[]|[]
           const response:ProductResponse = await this.productUsecase.addProduct(product,files)   
           res.status(response.status).json({message:response.message,data:response.data})       
        } catch (error) {
          console.log(error)
          res.status(500).json({message:'Error Adding Product'})
        }
      }

      async getProducts(req:Request,res:Response){
        try {
          const response = await this.productUsecase.fetchProducts()
          res.status(response.status).json({message:response.message,data:response.data})
        } catch (error) {
          console.log(error);
        }
      }

      async toggleBlock(req:Request,res:Response){
        try {
          const productId = req.body.productId
          const response = await this.productUsecase.toggleBlock(productId)
          res.status(response.status).json({message:response.message})
        } catch (error) {
          console.log(error);
        }
      }

      async updateProduct(req:Request,res:Response){
        try {
          const {productId, productData} = req.body
          const response = await this.productUsecase.updateProduct(productId,productData)
        } catch (error) {
          console.log(error);
          res.status(500).json({message:'Error Updating Product'})
        }
      }
    
}

export default ProductController