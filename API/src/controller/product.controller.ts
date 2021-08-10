import { Request,Response } from "express";

import { ProductModel } from "../model/product.model";


const MODEL = new ProductModel;

export class ProductController{


    public async categories(req:Request, res:Response){

        try {
            res.status(200).json( {ok:true,categories:await MODEL.categories()});
        } catch (error) {
            res.status(500).json({message:"Error calling function"});
        }
        
    }

    public async products(req:Request, res:Response){
        try {
            await MODEL.products(req.params.name,res);
        } catch (error) {
            res.status(500).json({message:"Error calling function"});
        }
        
    }

    public async Byid(req:Request, res:Response){
        try {
            await MODEL.Byid(req.params.name,res);
        } catch (error) {
            res.status(500).json({message:"Error calling function"});
        }
        
    }

    public async listEmployee(req:Request, res:Response){

        try {
            await MODEL.productsEmployee(req.params.id,res);
        } catch (error) {
            res.status(500).json({message:"Error calling function"});
        }
        
    }

    public async create(req:Request, res:Response){
        try {
            await MODEL.create(req.params.id,req.params.name,req.body,res,req);
        } catch (error) {
            res.status(500).json({message:"Error calling function"});
        }
    }

    public async update(req:Request, res:Response){

        try {
            await MODEL.update(req.body,req.params.id,req.params.name,res,req);
        } catch (error) {
            res.status(500).json({message:"Error calling function"});
        }
    }

    public async deleteByid(req:Request, res:Response){
        try {
            await MODEL.delete(req.params.id,res);
        } catch (error) {
            res.status(500).json({message:"Error calling function"});
        }
    }


    /*Carrito*/

    //Creando
    public async cart(req:Request, res:Response){
        try {
            await MODEL.cart(req.params.id,req.body.quantity,res);
        } catch (error) {
            res.status(500).json({message:"Error calling function"});
        }
    }

    //Eliminando
    public async eliminateCart(req:Request, res:Response){
        try {
            await MODEL.eliminateCart(req.params.id,res);
        } catch (error) {
            res.status(500).json({message:"Error calling function"});
        }
    }

    /*Shopping*/

    //Mostrando
    public async shopping(req:Request, res:Response){
        try {
            await MODEL.shopping(req.params.id,res);
        } catch (error) {
            res.status(500).json({message:"Error calling function"});
        }
    }
}