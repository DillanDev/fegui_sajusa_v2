import { Application } from "express";

import { UserController } from "../controller/user.controller";
import { userJWT,adminJWT } from "../middleware/auth";

export class UserRoute{
    
    public userController: UserController = new UserController();

    public routes(app:Application){

        app.get('/fegui_sajusa/api/v2/user/:id',[userJWT],  this.userController.user );
        app.patch('/fegui_sajusa/api/v2/updata/user/:id',[userJWT],  this.userController.updateUser );
        app.patch('/fegui_sajusa/api/v2/delete/user/:id',[userJWT],  this.userController.delete );
        
    }
}