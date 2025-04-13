import { IProduct, product } from "../../domain/product";
import { productModel } from "../../infrastructure/database/productModel";
import productRepository from "../../useCase/interfaces/productRepository";

class ProductRepository implements productRepository {
    constructor(){}

    async fetchProductById(productId:string){
      try {
        const product = await productModel.findOne({_id:productId})
        return product
      } catch (error) {
        console.log(error);
        return null
      }
    }

    async addProducts(products: product, files: string[]) {
        try {
          const document = {
            name: products.name,
            brand: products.brand,
            description: products.description,
            category: products.category,
            stock: products.stock,
            price: products.price,
            images: files,
          };
      
          const newProduct = new productModel(document);
          const savedProduct = await newProduct.save();
      
          // Now re-fetch and populate
          const populatedProduct = await productModel
            .findById(savedProduct._id)
            .populate('category', 'name')
            .populate('brand', 'name');
      
          return populatedProduct;
      
        } catch (error) {
          console.log(error);
          return null;
        }
      }
      

    async productByName(name:string){
        try {
    const products = await productModel.findOne({name:name}).populate('category','name').populate('brand','name')
    return products            
        } catch (error) {
            console.log(error)
            return null
        }
    }

    async fetchProducts(){
        try {
    const products = await productModel.find({}).populate('category','name').populate('brand','name')
    return products            
        } catch (error) {
            console.log(error);
            return null
        }
    }

    async updateProduct(productId:string, updatedData:Partial<IProduct>){
      try {
    const updatedProduct = await productModel.findByIdAndUpdate(
      productId,
      {$set:updatedData}
    )
    return updatedProduct
      } catch (error) {
        console.log(error);
        return null
      }
    }

}

export default ProductRepository