import { Request,Response,NextFunction } from "express";
import * as jwt from 'jsonwebtoken';
import Key from "../config/key-admin";

export const employeeJWT = (req:Request, res:Response, next: NextFunction)=>{

    const token = <string>req.headers['auth'];
    let jwtPayload;

    try{
        jwtPayload = <any>jwt.verify(token,Key.jwtSecret);
        res.locals.jwtPayload = jwtPayload;
    }catch(e){
        return res.status(401).json({message:"Not authorized"});
    }

    const {userId,username} = jwtPayload;

    const newToken = jwt.sign({userId,username},Key.jwtSecret,{expiresIn: '48h'});
    res.setHeader('token',newToken);
    next();
}