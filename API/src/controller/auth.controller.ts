import { Request,Response } from "express";

import { AuthModel } from "../model/auth.model";
import { createUsersValidation,forgortPasswordValidation } from "../config/validation";


export class Auth{
  
    public async login(req:Request,res:Response){


        try{
        
            const {email,password} = req.body;
            
            if(!(email && password)){
                return res.json({ok:false,message: 'Username and password required'});
            }

            await AuthModel.login(req.body,res);
            
        }catch(error){
            return res.status(500).json({
                ok:false,
                message: 'Error internal server!'});
        }          
    }

    
    public async register(req:Request, res:Response){

        try {

            if(!createUsersValidation(req.body)){
                return res.status(406).json({
                    ok:false,
                    message: 'Data invalid!'
                });   
                         
            }

            await AuthModel.register(req.body,res)
            
        } catch (error) {
            return res.status(500).json({
                ok:false,
                message: 'Error internal server '
            });
        }
    }

    
    public async changePassword(req: Request, res:Response){
         try {

            const { oldPass, newPass} = req.body;

            if(!(oldPass && newPass)){
                return  res.status(406).json({
                    ok:false,
                    message: 'Old password and new password required!'
                });   
            }

            await AuthModel.changePassword(oldPass,newPass,res)
            
        } catch (error) {
            return res.status(500).json({
                ok:false,
                message: 'Error internal server '
            });
        }

    }

    public async forgortPassword(req: Request, res:Response){
        try {

            const { email } = req.body;

            if(!(email)){
                return  res.status(406).json({
                    ok:false,
                    message: 'Email is required!'
                });   
            }

            if(!forgortPasswordValidation(email)){
                return res.status(406).json({
                    ok:false,
                    message: 'Data invalid!'
                });   
                         
            }

            await AuthModel.forgortPassword(email,res);

            
        } catch (error) {
            return res.status(500).json({
                ok:false,
                message: 'Error internal server '
            });
        }
    }    


    public async createNewPassword(req: Request, res:Response){
        const { newPassword } = req.body;
        const resetToken = req.headers.reset as string;

        try {
            if(!(newPassword&&resetToken )){
                return  res.status(406).json({
                    ok:false,
                    message: 'All the fields are required!'
                });   
            }

            await AuthModel.createNewPassword(resetToken,newPassword,res);

        } catch (error) {
            return res.status(500).json({
                ok:false,
                message: 'Error internal server '
            });
        }
    }

}