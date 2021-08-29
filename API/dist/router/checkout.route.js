"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckoutRoute = void 0;
const checkout_controller_1 = require("../controller/checkout.controller");
class CheckoutRoute {
    constructor() {
        this.checkoutController = new checkout_controller_1.CheckoutController();
    }
    routes(app) {
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
exports.CheckoutRoute = CheckoutRoute;
