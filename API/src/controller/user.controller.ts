import {Response,Request} from "express";

import { UserModel } from "../model/user.model";
import { createUsersValidation,forgortPasswordValidation } from "../config/validation";


export class UserController{


    public async user(req:Request, res:Response){

        try {
            await UserModel.user(req.params.id,res);
        } catch (error) {
            res.status(500).json({
                ok:false,
                message:"Error calling function"
            });
        }    
    }

    public async updateUser(req:Request, res:Response){

        try {

            await UserModel.updateUser(req.params.id,req.body,res);
                
        } catch (error) {

           res.status(500).json({
                ok:false,
                message:"Error calling function"
            });

        }
    }

    public async delete(req:Request, res:Response){
        
        try {

            await UserModel.deleteUser(req.params.id,res);

        } catch (error) {

            res.status(500).json({
                ok:false,
                message:"Error calling function"
            });
        }

    }



}