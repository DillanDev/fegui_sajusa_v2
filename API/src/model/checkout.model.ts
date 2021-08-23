import bcrypt from "bcrypt";
import * as jwt from 'jsonwebtoken';

import MySQL from '../config/connection';
import { DataI, ResponseI } from './../interface/data.interface'
import { UploadController } from '../controller/upload.controller';
import key from "../config/key-users";

export class CheckoutModel{
    static Query = '';
    static inserts = [''];
    
    // //Creando un carrito
    // public async cart(id:string,quantity:any,res:any){
    //     this.Query = "SELECT `quantity` FROM `products` WHERE id='"+id+"'";
    //     let q:any = await MySQL.executeQuery(this.Query); 
    //     if ( q[0].quantity< Number(quantity)){
    //         return res.status(400).json({ok:false,message:'Sobre pasa lo que hay en el inventario'})
    //     }
    //     this.Query = "SELECT `products_id` FROM `cart` WHERE products_id='"+id+"'";
    //     q = await MySQL.executeQuery(this.Query); 
    //     try {
    //         if(q[0].constructor.name == 'RowDataPacket'){
    //             this.Query='UPDATE `cart` SET `quantity`='+quantity+' WHERE products_id='+id+'';
    //             await MySQL.executeQuery(this.Query); 
    //             return res.status(200).json({
    //                 ok:true,
    //                 message:'Se actualizo correctamente'
    //             });
    //         }
    //     } catch (error) {
    //         this.Query='INSERT INTO `cart`(`products_id`, `quantity`) VALUES ('+id+','+quantity+')';
    //         await MySQL.executeQuery(this.Query); 
    //         return res.status(200).json({
    //             ok:true,
    //             message:'Se creo correctamente'
    //         }); 
    //     }
    //     //OkPacket
    // }


    // public async eliminateCart(id:string,res:any){
    //     try {
    //         this.Query = "SELECT `products_id` FROM `cart` WHERE products_id = '"+id+"'";
    //         let result:any = await MySQL.executeQuery(this.Query);
    //         if(result[0].constructor.name === 'RowDataPacket'){
    //             this.Query = "DELETE FROM `cart` WHERE products_id='"+id+"'";
    //             result = await MySQL.executeQuery(this.Query);
    //             return res.status(200).json({
    //                 ok:true,
    //                 message:'Se elimino correctamente'
    //             });
    //         }
    //     } catch (error) {
    //         return res.status(404).json({
    //             ok:false,
    //             message:'No se encontro el carrito'
    //         });
    //     }
    // }

    // //Shopping
    // public async shopping(id:string,res:any){
    //     try {
    //         this.Query = "SELECT `products_id` FROM `customersxproducts` WHERE customers_id='"+id+"'";
    //         var result:any = await MySQL.executeQuery(this.Query);
    //         var price:any;
    //         var quantity:any;
    //         var x:any = [];
    //         var total:number =0 ;
    //         for (let index = 0; index < result.length; index++) {
    //             this.Query = `SELECT price FROM products WHERE id = '${result[index].products_id}'`;
    //             price = await MySQL.executeQuery(this.Query); 
    //             this.Query = "SELECT `quantity` FROM `cart` WHERE products_id = '"+result[index].products_id+"'" 
    //             quantity = await MySQL.executeQuery(this.Query); 
    //             try {               
    //                 total += Number(price[0].price * quantity[0].quantity);
    //             } catch (error) {
    //                 total += Number(price[0].price);
    //             }             
    //         }
    //         try {
    //             this.Query = 'SELECT `price` FROM `shoppingseccion` WHERE `customer_id`='+id+'';
    //             result = await MySQL.executeQuery(this.Query); 
    //             if(result[0].constructor.name === 'RowDataPacket'){
    //                 this.Query = 'UPDATE `shoppingseccion` SET `price`='+total+' WHERE `customer_id`='+id+'';
    //                 result = await MySQL.executeQuery(this.Query); 
    //             } 
    //             return res.json({ok:true,message:'Precio actualizado correctamente'});
    //         } catch (error) {
    //             this.Query = 'INSERT INTO `shoppingseccion`(`customer_id`, `price`) VALUES ('+id+','+total+')';
    //             result = await MySQL.executeQuery(this.Query); 
    //             return res.json({ok:true,message:'Precio ingresado correctamente'});
    //         }
    //     } catch (error) {
    //         return res.status(400).json({ok:false,error});      
    //     } 
    // }
   

}