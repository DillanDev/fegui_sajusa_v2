import bcrypt from "bcrypt";
import * as jwt from 'jsonwebtoken';

import MySQL from '../config/connection';
import { DataI, ResponseI } from './../interface/data.interface'
import { UploadController } from '../controller/upload.controller';
import key from "../config/key-users";




export class UserModel{
    
    static Query = '';
    static inserts = [''];

    //Para Clientes y administradores!
    static async user(id:string,res:ResponseI){
      try {
            let escapeID = MySQL.instance.cnn.escape(id);
            this.Query  = `
            SELECT * 
            FROM users 
            WHERE id = ${escapeID} AND status = 'active'`;
            let result:any = await MySQL.executeQuery(this.Query); 
            delete result[0].password;
            delete result[0].resetToken;
            return res.status(200).json({
                        ok:true,
                        user: result[0],
                     });

        } catch (error) {

            res.status(500).json({
                        ok:false,
                        message: 'Consult failed!'
            });

        }

    }  

    static async updateUser(id:string,data:DataI | any,res:ResponseI){
        try {   
            var i = 0;

            if(data.password){
                return res.status(406).json({
                    ok: false,
                    message: 'Field invalid!'
                
                });
            }

            let escapeID = MySQL.instance.cnn.escape(id);

            for (var value in data) {
                this.inserts[i] = '';
                this.inserts[i] += value;
                i++;
                this.inserts[i] = '';
                this.inserts[i] += data[value];
                i++;
            }

            this.Query = `UPDATE users SET ??=?`
            for (let i =1 ; i<=Object.keys(data).length-1;i++){
                this.Query +=',??=?';
            }


            this.Query += ` WHERE id = ${escapeID} AND status = 'active' `;
            this.Query = MySQL.instance.cnn.format(this.Query,this.inserts);
            var result:any;
                await MySQL.executeQuery(this.Query).then(()=>{ 
                    if(data.password) delete data.password;
                    result = data; 
                }); 

            return res.status(200).json({
                ok: true,
                message: 'Success full!'
                
            });
        } catch (error) {
            return res.status(500).json({
                ok: false,
                message: 'Consult failed!'
                
            });
        }
    }

    static async deleteUser(id:string,res:ResponseI){

        let escapeID = MySQL.instance.cnn.escape(id);
        this.Query = `
        UPDATE users 
        SET status='disabled' 
        WHERE id = ${escapeID}`;

        try{
            let rows:any = await MySQL.executeQuery(this.Query);

            if(rows.constructor.name === "OkPacket"){
                return res.status(200).json({
                    ok:true,
                    message: 'User delete success!'
                    
                })
            }
        }catch(error){
            return res.status(406).json({
                    ok:false,
                    message: 'Delete Failed!'
                    
            });
        }
        


    }




}