import { Request,Response } from "express";

import { ShoppingModel } from "../model/shopping.model";

export class ShoppingController{

	    public async cart(req:Request, res:Response){

	        try {

	            await ShoppingModel.cart(req,res);

	        } catch (error) {
	            res.status(500).json({
	                ok:false,
	                message:"Error calling function"
	            });
	        }    

    	}

	    public async addCart(req:Request, res:Response){

	        try {

	            await ShoppingModel.addCart(req,res);

	        } catch (error) {
	            res.status(500).json({
	                ok:false,
	                message:"Error calling function"
	            });
	        }    

    	}

    	public async updateCart(req:Request, res:Response){

	        try {

	            await ShoppingModel.updateCart(req,res);

	        } catch (error) {
	            res.status(500).json({
	                ok:false,
	                message:"Error calling function"
	            });
	        }    

    	}

    	public async deleteCart(req:Request, res:Response){

	        try {

	            await ShoppingModel.deleteCart(req,res);

	        } catch (error) {
	            res.status(500).json({
	                ok:false,
	                message:"Error calling function"
	            });
	        }    

    	}

    	

}