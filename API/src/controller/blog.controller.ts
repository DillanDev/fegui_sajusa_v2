import { Request,Response } from "express";

import { BlogModel } from "../model/blog.model";


export class BlogController{
	
    /*POST*/
    public async post(req:Request, res:Response){
        try {
            await BlogModel.post(req,res);
        } catch (error) {
            res.status(500).json({message:"Error calling function"});
        }     
    }
 
    public async Byid(req:Request, res:Response){     
        try {
            await BlogModel.Byid(req.params.id,res)

        } catch (error) {

            res.status(500).json({message:"Error calling function"});

        }

    }

    public async createPost(req:Request, res:Response){
        try {
            await BlogModel.createPost(req,res);
        } catch (error) {
            res.status(500).json({message:"Error calling function"});
        }
    }

    public async updatePost(req:Request, res:Response){

        try {
            await BlogModel.updatePost(req,res);
        } catch (error) {
            res.status(500).json({message:"Error calling function"});
        }
    }

    public async deletePost(req:Request, res:Response){
        try {
            await BlogModel.deletePost(req.params.id,res);
        } catch (error) {
            res.status(500).json({message:"Error calling function"});
        }
    }

 
}