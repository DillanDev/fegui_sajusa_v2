import bcrypt from "bcrypt";
import * as jwt from 'jsonwebtoken';

import MySQL from '../config/connection';
import { DataI, ResponseI } from './../interface/data.interface'
import { UploadController } from '../controller/upload.controller';
import key from "../config/key-users";

export class ShoppingModel{
    static Query = '';
    static inserts = [''];
    static result:any = '';

    static async cart(req:any,res:ResponseI){
      try {
            
        
        this.Query = `SELECT * FROM cart WHERE users_id='${req.params.id}'`
        this.result = await MySQL.executeQuery(this.Query);  
    
        

        return res.status(200).json({
                        ok:true,
                        cart:this.result

            });


        } catch (error) {

          return  res.status(500).json({
                        ok:false,
                        message: 'Consult failed!'
            });

        }
    }  

    static async addCart(req:any,res:ResponseI){
      try {
            
        
        this.Query = `INSERT INTO cart(users_id, products_id, quantity) VALUES ('${req.params.ID}','${req.params.id}','${req.body.quantity}')`
        this.result = await MySQL.executeQuery(this.Query);  
    
        

        return res.status(200).json({
                        ok:true,
                        user_id: req.params.ID,
                        product_id: req.params.id,
                        cart_id:this.result.insertId,
                        quantity: req.body.quantity

            });


        } catch (error) {

          return  res.status(500).json({
                        ok:false,
                        message: 'Consult failed!'
            });

        }
    }  

    static async updateCart(req:any,res:ResponseI){
      try {
            
        
        this.Query = `UPDATE cart SET quantity ='${req.body.quantity}' WHERE id = '${req.params.id}' AND users_id='${req.params.ID}' `
        this.result = await MySQL.executeQuery(this.Query);  
    
        

        return res.status(200).json({
                        ok:true,
                        message:'Success!'

            });


        } catch (error) {

          return  res.status(500).json({
                        ok:false,
                        message: 'Consult failed!'
            });

        }
    }  

    static async deleteCart(req:any,res:ResponseI){
      try {
            
        
        this.Query = `DELETE FROM cart WHERE  users_id='${req.params.ID}' AND id='${req.params.id}' `
        this.result = await MySQL.executeQuery(this.Query);  
    


        return res.status(200).json({
                        ok:true,
                        message:'Success!'

            });


        } catch (error) {

          return  res.status(500).json({
                        ok:false,
                        message: 'Consult failed!'
            });

        }
    } 
}