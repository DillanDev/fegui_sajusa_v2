import { Application } from "express";

import { ShoppingController } from "../controller/shopping.controller";
import { userJWT } from "../middleware/auth";

export class ShoppingRoute{
    
    public shoppingController: ShoppingController = new ShoppingController();

    public routes(app:Application){

        //cart
        app.get('/fegui_sajusa/api/v2/user/:id/cart',[userJWT],  this.shoppingController.cart );
        app.post('/fegui_sajusa/api/v2/user/:ID/product/:id/add-cart',[userJWT],  this.shoppingController.addCart );
        app.patch('/fegui_sajusa/api/v2/user/:ID/update-cart/:id',[userJWT],  this.shoppingController.updateCart );
        app.delete('/fegui_sajusa/api/v2/user/:ID/delete-cart/:id',[userJWT],  this.shoppingController.deleteCart );
    
        //Get shopping
        //app.get('/fegui_sajusa/api/v2/user/:id/cart',[userJWT],  this.userController.user );


    }
    
}