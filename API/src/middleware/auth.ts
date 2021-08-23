import { Request,Response,NextFunction } from "express";
import * as jwt from 'jsonwebtoken';
import Key from "../config/key-users";

export const userJWT = (req:Request, res:Response, next: NextFunction)=>{

    const token = <string>req.headers['auth'];
    let jwtPayload;

    try{
        jwtPayload = <any>jwt.verify(token,Key.jwtSecret);
        res.locals.jwtPayload = jwtPayload;
    }catch(e){
        return res.status(401).json({
            ok: false,
            message:"Not authorized!"
        });
    }
    const {userId,username} = jwtPayload;

    const newToken = jwt.sign({userId,username},Key.jwtSecret,{expiresIn: '48h'});
    res.setHeader('token',newToken);
    next();
}

export const adminJWT = (req:Request, res:Response, next: NextFunction)=>{

    // let user:any = req.user ;

    const token = <string>req.headers['auth'];

    let jwtPayload = <any>jwt.verify(token,Key.jwtSecret);


    let user:any = jwtPayload;
    if(user.role === 'admin'){
        next();
    }else{
        return res.json({
            ok: false,
            message:"User not admin!"
        });
    }




}