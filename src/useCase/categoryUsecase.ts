import { category, Icategory } from "../domain/category";
import categoryRepository from "../infrastructure/repositories/categoryRepository";



class CategoryUsecase{
    private readonly categoryRepository:categoryRepository
constructor(categoryRepository:categoryRepository){
    this.categoryRepository = categoryRepository
}
async getCategory(){
    try {
        const category = await this.categoryRepository.fetchCategory()
        if(category && category.length > 0){
            return {
                status:200,
                data:category,
                message:'Successfully fetched categories'
            }
        }else{
            return {
                status:200,
                data:null,
                message:'No categories found'
            }
        }
    } catch (error) {
        console.log(error);
        return {
            status:500,
            message:'Failed to fetch categories'
        }
    }
}

async addCategory(category:category){
    try {
        const isExisting = await this.categoryRepository.searchCategory(category.categoryName)
        let status:Icategory | false
        if(isExisting){
            status = false
        }else{
            status =  await this.categoryRepository.addCategory(category.categoryName) as Icategory
        }
     if(status){
        return {
            status:201,
            message:'Category added successfully',
            data:status
        }
     }else{
        return {
            status:400,
            message:'Failed to add category'
        }
     }
    } catch (error) {
        console.log(error);
        return {
            status:500,
            message:'Failed to add category'
        }
    }
}

}
export default CategoryUsecase