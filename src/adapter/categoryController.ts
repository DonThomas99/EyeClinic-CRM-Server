import { Request,Response } from "express";
import CategoryUsecase from "../useCase/categoryUsecase";
import categoryRepository from "../infrastructure/repositories/categoryRepository";

class CategoryController {
    constructor(CategoryUseCase:CategoryUsecase){
    }

}

export default CategoryController;