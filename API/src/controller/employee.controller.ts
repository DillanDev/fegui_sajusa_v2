import {Response,Request} from "express";

import { EmployeeModel } from "../model/employee.model";


const MODEL = new EmployeeModel;


export class EmployeeController{


    public async employees(req:Request, res:Response){

        try {
            await MODEL.employees(res);
        } catch (error) {
            res.status(500).json({message:"Error calling function"});
        }
        
    }

    public async Byid(req:Request, res:Response){
        
        try {
            await MODEL.employee(req.params.id,res)

        } catch (error) {

            res.status(500).json({message:"Error calling function"});

        }

    }

    public async update(req:Request, res:Response){

        try {

            await MODEL.update(req.params.id,req.body,res);
                
        } catch (error) {

            res.status(500).json({message:"Error calling function"});

        }

    }

    public async delete(req:Request, res:Response){
        
        try {

            await MODEL.delete(req.params.id,res);

            res.status(204).json();

        } catch (error) {

            res.status(500).json({msg:"Error calling function"});

        }

    }

    /*POST*/

    
    public async posts(req:Request, res:Response){

        try {
            await MODEL.posts(res);
        } catch (error) {
            res.status(500).json({message:"Error calling function"});
        }
        
    }

    public async post(req:Request, res:Response){
        
        try {
            await MODEL.post(req.params.id,res)

        } catch (error) {

            res.status(500).json({message:"Error calling function"});

        }

    }

    public async createPost(req:Request, res:Response){
        try {
            await MODEL.createPost(req.params.id,req.body,res,req);
        } catch (error) {
            res.status(500).json({message:"Error calling function"});
        }
    }

    public async updatePost(req:Request, res:Response){

        try {
            await MODEL.updatePost(req.body,req.params.id,res,req);
        } catch (error) {
            res.status(500).json({message:"Error calling function"});
        }
    }

    public async deletePost(req:Request, res:Response){
        try {
            await MODEL.deletePost(req.params.id,res);
        } catch (error) {
            res.status(500).json({message:"Error calling function"});
        }
    }

    /*COMMENTS*/
    public async comments(req:Request, res:Response){
        try {
            await MODEL.comments(req.params.id,res);
        } catch (error) {
            res.status(500).json({message:"Error calling function"});
        }
    }

    public async createComment(req:Request, res:Response){
        try {
            await MODEL.createComment(req.params.ID,req.params.id,res,req.body);
        } catch (error) {
            res.status(500).json({message:"Error calling function"});
        }
    }

    public async updateComment(req:Request, res:Response){
        try {
            await MODEL.updateComment(req.params.id,req.body,res);
        } catch (error) {
            res.status(500).json({message:"Error calling function"});
        }
    }

    public async deleteComment(req:Request, res:Response){
        try {
            await MODEL.deleteComment(req.params.ID,req.params.id,res);
        } catch (error) {
            res.status(500).json({message:"Error calling function"});
        }
    }

}