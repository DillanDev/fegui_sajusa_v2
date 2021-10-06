import { Application,Response,Request } from "express";
import fs  from "fs";
import path from "path";

import { UploadController } from "../controller/upload.controller";


export class UploadRoute{
    
    public uploadController: UploadController = new UploadController();

    public routes(app:Application,res?:Response,req?:Request){
        app.get('/fegui_sajusa/api/v2/image/:tipe/:img', this.uploadController.show);
        app.delete('/fegui_sajusa/api/v2/image/:tipe/:img', this.uploadController.delete);

    }
    
}