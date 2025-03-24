import { category } from "../../domain/category";
import categoryModel from "../database/categoryModel"

class categoryRepository{
    constructor(){}

    async fetchCategory(){
        try {
    const categoryList = await categoryModel.find({})
    return categoryList        
        } catch (error) {
            console.log(error)
        }
    }

async addCategory(category:category){
try {
    const save = await categoryModel.insertOne(category)
    if(save){
        return true
    }
} catch (error) {
    console.log(error)
}
}
}
export default categoryRepository