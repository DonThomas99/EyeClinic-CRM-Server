import { Request,Response } from "express";
import CategoryUsecase from "../useCase/categoryUsecase";

class CategoryController {
    private categoryUseCase: CategoryUsecase;
    constructor(CategoryUseCase:CategoryUsecase){
        this.categoryUseCase = CategoryUseCase;
    }
    async getCategory(req: Request, res: Response){
        try {
            const categories = await this.categoryUseCase.getCategory();
            res.status(200).json({status:categories.status,data:categories.data,message:categories.message});
        } catch (error) {
            console.log(error);
            res.status(500).json({status: 500, message: 'Internal Server Error'});
        }
    }

    async addCategory(req: Request, res: Response){
        try {
            const categoryData = req.body;
            const category = await this.categoryUseCase.addCategory(categoryData);
            res.status(category.status).json({status: category.status, message: category.message});
        } catch (error) {
            console.log(error);
            res.status(500).json({status: 500, message: 'Internal Server Error'});
        }
    }

}

export default CategoryController;