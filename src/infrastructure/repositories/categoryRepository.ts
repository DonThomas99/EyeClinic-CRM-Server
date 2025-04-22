import { category, Icategory } from "../../domain/category";
import categoryModel from "../database/categoryModel"

class categoryRepository{
    constructor(){}

    async fetchCategory(){
        try {
    const categoryList = await categoryModel.find({})
    return categoryList        
        } catch (error) {
            console.error(error)
        }
    }

    async fetchCategoryByName(category:string){
        try {
            const search = await categoryModel.findOne({name:category})            
            if(search){
                return true
            }else{
                return false
            }
        } catch (error) {
            console.error(error);
            return false
        }
    }

async addCategory(categoryName:string){ 
try {
    const category = new categoryModel({name:categoryName})
    const save =   await category.save()
    if(save){
        return save
    }else{
        return false
    }
} catch (error) {
    console.error(error)
    return false
}
}
async toggleBlock(categoryId:string){
    try {
        const category = await categoryModel.findById(categoryId)
        if(!category){
            return null
        }
        category.isBlocked = !category.isBlocked
        const status = await  category.save()
        return status
        
    } catch (error) {
        console.error(error);
        return false
    }
}

async getCategoryById(categoryId:string){
    try {
         const category = await categoryModel.findById({_id:categoryId})
        return category as category | null
    } catch (error) {
        console.error(error);
        return null
    }
}

async updateCategory(categoryId:string,updatedData:Partial<Icategory>){
    try {
   
        const updateCategory = await categoryModel.findByIdAndUpdate(
            categoryId,
            {$set:updatedData}

        ) 
        return updateCategory        
    } catch (error) {
        console.error(error);
        return null
    }
}

}
export default categoryRepository