import { IProduct } from "../../domain/product";
import { productModel } from "../../infrastructure/database/productModel";
import productRepository from "../../useCase/interfaces/productRepository";

class ProductRepository implements productRepository {
    constructor(){}

    async addProducts(products: IProduct) {
        try {
            const product = new productModel(products);
            await product.save();
            return product;
        } catch (error) {
            console.log(error);
        }
    }

}

export default ProductRepository