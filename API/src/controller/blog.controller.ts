import { Request,Response } from "express";

import { BlogModel } from "../model/blog.model";


const MODEL = new BlogModel;

export class BlogController{
	
 //    /*POST*/
 //    public async posts(req:Request, res:Response){
 //        try {
 //            await MODEL.posts(res);
 //        } catch (error) {
 //            res.status(500).json({message:"Error calling function"});
 //        }     
 //    }
 
 //    public async post(req:Request, res:Response){     
 //        try {
 //            await MODEL.post(req.params.id,res)

 //        } catch (error) {

 //            res.status(500).json({message:"Error calling function"});

 //        }

 //    }

 //    public async createPost(req:Request, res:Response){
 //        try {
 //            await MODEL.createPost(req.params.id,req.body,res,req);
 //        } catch (error) {
 //            res.status(500).json({message:"Error calling function"});
 //        }
 //    }

 //    public async updatePost(req:Request, res:Response){

 //        try {
 //            await MODEL.updatePost(req.body,req.params.id,res,req);
 //        } catch (error) {
 //            res.status(500).json({message:"Error calling function"});
 //        }
 //    }

 //    public async deletePost(req:Request, res:Response){
 //        try {
 //            await MODEL.deletePost(req.params.id,res);
 //        } catch (error) {
 //            res.status(500).json({message:"Error calling function"});
 //        }
 //    }

 
}