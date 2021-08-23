import { Request,Response } from "express";

import { ProductModel } from "../model/product.model";

export class ProductController{

    public async allCategories(req:Request, res:Response){

        try {

            await ProductModel.allCategories(res);

        } catch (error) {
            return res.status(500).json({
                ok:false,
                message:"Error calling function!"});
        }       
    }

    public async category(req:Request, res:Response){

        try {

            await ProductModel.category(req,res);

        } catch (error) {
            return res.status(500).json({
                ok:false,
                message:"Error calling function!"});
        } 
    }

    public async searchShort(req:Request, res:Response){
        try {

            await ProductModel.searchShort(req.params.name,res);

        } catch (error) {
            return res.status(500).json({
                ok:false,
                message:"Error calling function!"});
        } 
    }

    public async search(req:Request, res:Response){
        try {

            await ProductModel.search(req,res);

        } catch (error) {
           return res.status(500).json({
                ok:false,
                message:"Error calling function!"});
        } 
    }

    public async Byid(req:Request, res:Response){
        try {
            await ProductModel.Byid(req.params.id,res);
        } catch (error) {
           return res.status(500).json({
                ok:false,
                message:"Error calling function!"});
        }
    }

    public async productSlider(req:Request, res:Response){
        try {
            await ProductModel.productSlider(req.params.id,res);
        } catch (error) {
            return res.status(500).json({
                ok:false,
                message:"Error calling function!"});
        }
    }

    //===================
    //       ADMIN      |
    //===================

    public async createCategory(req:Request, res:Response){
        try {
            await ProductModel.createCategory(req,res);
        } catch (error) {
            return res.status(500).json({
                ok:false,
                message:"Error calling function!"});
        }
    }   

    public async updateCategory(req:Request, res:Response){
        try {
            await ProductModel.updateCategory(req,res);
        } catch (error) {
            return res.status(500).json({
                ok:false,
                message:"Error calling function!"});
        }
    }   

    public async deleteCategory(req:Request, res:Response){
        try {
            await ProductModel.deleteCategory(req,res);
        } catch (error) {
            return res.status(500).json({
                ok:false,
                message:"Error calling function!"});
        }
    }   

    public async createProduct(req:Request, res:Response){
        try {
            await ProductModel.createProduct(req,res);
        } catch (error) {
            res.status(500).json({
                ok:false,
                message:"Error calling function!"});
        }
    }

    public async updateProduct(req:Request, res:Response){

        try {
            await ProductModel.updateProduct(res,req);
        } catch (error) {
            res.status(500).json({
                ok:false,
                message:"Error calling function!"});
        }
    }

    public async deleteProduct(req:Request, res:Response){
        try {
            await ProductModel.deleteProduct(req.params.id,res);
        } catch (error) {
            res.status(500).json({message:"Error calling function"});
        }
    }

}