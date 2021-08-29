import { Application } from "express";

import { CheckoutController } from "../controller/checkout.controller";
import { userJWT } from "../middleware/auth";

export class CheckoutRoute{
    
    public checkoutController: CheckoutController = new CheckoutController();

    public routes(app:Application){
        
        //Orders
        //app.get('/fegui_sajusa/api/v2/product/:id/add-cart',[userJWT],  this.checkoutController.user );
        //app.post('/fegui_sajusa/api/v2/product/:id/add-cart',[userJWT],  this.checkoutController.user );
        //app.patch('/fegui_sajusa/api/v2/product/:id/add-cart',[userJWT],  this.checkoutController.user );
        //app.delete('/fegui_sajusa/api/v2/product/:id/add-cart',[userJWT],  this.checkoutController.user );

        //Invoice
        //app.get('/fegui_sajusa/api/v2/product/:id/add-cart',[userJWT],  this.checkoutController.user );


        //Payment CRUD
        //app.post('/fegui_sajusa/api/v2/product/:id/add-cart',[userJWT],  this.checkoutController.user );
        //app.patch('/fegui_sajusa/api/v2/product/:id/add-cart',[userJWT],  this.checkoutController.user );
        //app.delete('/fegui_sajusa/api/v2/product/:id/add-cart',[userJWT],  this.checkoutController.user );

    }
    
}