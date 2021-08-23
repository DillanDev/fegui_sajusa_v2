import { Router,Application } from "express";

import {Auth} from '../controller/auth.controller';
import { userJWT } from "../middleware/auth";


export class AuthRoute{

    public auth: Auth = new Auth();

    public routes(app:Application):void{
        
        app.post('/fegui_sajusa/api/v2/auth/login', this.auth.login);

        app.post('/fegui_sajusa/api/v2/register', this.auth.register);

        //Change password
        app.post('/fegui_sajusa/api/v2/change-password',[userJWT], this.auth.changePassword);

        //Forgot Password
        app.put('/fegui_sajusa/api/v2/forgort-password', this.auth.forgortPassword);

        //Create new password
        app.put('/fegui_sajusa/api/v2/new-password', this.auth.createNewPassword);
    }


}