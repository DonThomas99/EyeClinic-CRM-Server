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
        const isExisting = await this.categoryRepository.fetchCategoryByName(category.categoryName)
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

async toggleBlock(categoryId:string){
    try {
        const isExisting = await this.categoryRepository.getCategoryById(categoryId)
        if(isExisting){
            const response = await this.categoryRepository.toggleBlock(categoryId)
            if(response){
                return {
                    status:200,
                    message:'Category toggled successfully',
                }
            }else{
                return {
                    status:500,
                    message:'Failed to toggle block'
                }
            }
        }else{
            return {
                status:404,
                message:'Category not found'
            }
        }
        
    } catch (error) {
        console.log(error);
        return {
            status:500,
            message:'Failed to toggle block'
        }
    }
}

async updateCategory(categoryId:string,categoryData:Partial<Icategory>){
    try {
        const isExisting = await this.categoryRepository.getCategoryById(categoryId)
        if(isExisting){
            await this.categoryRepository.updateCategory(categoryId,categoryData)
            return {
                status:200,
                message:'Category Updated Successfully'
            }
        }else{
            return {
                status:401,
                message:'Category Not Found'
            }
        }
    } catch (error) {
        console.log(error);
        return {
            status:500,
            message:"Error Updating Category"
        }
    }
}

}
export default CategoryUsecase