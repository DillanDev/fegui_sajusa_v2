import { Router,Application } from "express";

import {Auth} from '../controller/auth.controller';
import { employeeJWT } from "../middleware/admin";

export class AuthRoute{
    public auth: Auth = new Auth();

    public routes(app:Application):void{
        
        app.post('/fegui_sajusa/api/v1/:name/auth/login', this.auth.login);
        app.post('/fegui_sajusa/api/v1/employees/register',[employeeJWT], this.auth.register);
        app.post('/fegui_sajusa/api/v1/register', this.auth.register);
    }
}