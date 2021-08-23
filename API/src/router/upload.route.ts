import { Application,Response,Request } from "express";
import fs  from "fs";
import path from "path";

import { UploadController } from "../controller/upload.controller";


export class UploadRoute{
    
    public uploadController: UploadController = new UploadController();

    public routes(app:Application,res?:Response,req?:Request){
        app.get('/fegui_sajusa/api/v2/image/:tipe/:img',(req,res)=> {
            let tipo = req.params.tipe;
            let img = req.params.img;

            let pathImagen = path.resolve(__dirname,`../../uploads/${tipo}/${img}`);

            if(fs.existsSync(pathImagen)){
                res.sendFile(pathImagen);
            }else{
                let noImagePath = path.resolve(__dirname,`../../uploads/no_image.jpg `)
                res.sendFile(noImagePath);
            }

        } );

    }
    
}