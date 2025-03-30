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

    async searchCategory(category:string){
        try {
            const search = await categoryModel.findOne({name:category})            
            if(search){
                return true
            }else{
                return false
            }
        } catch (error) {
            console.log(error);
            return false
        }
    }

async addCategory(categoryName:string){
try {
    console.log(categoryName);
    const category = new categoryModel({name:categoryName})
    const save =   await category.save()
    if(save){
        return save
    }else{
        return false
    }
} catch (error) {
    console.log(error)
    return false
}
}
}
export default categoryRepository