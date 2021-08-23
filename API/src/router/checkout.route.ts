import { Application } from "express";

import { CheckoutController } from "../controller/checkout.controller";
import { userJWT } from "../middleware/auth";

export class CheckoutRoute{
    
    public checkoutController: CheckoutController = new CheckoutController();

    public routes(app:Application){
        
    }
    
}