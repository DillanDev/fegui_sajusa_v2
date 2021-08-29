"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShoppingRoute = void 0;
const shopping_controller_1 = require("../controller/shopping.controller");
const auth_1 = require("../middleware/auth");
class ShoppingRoute {
    constructor() {
        this.shoppingController = new shopping_controller_1.ShoppingController();
    }
    routes(app) {
        //cart
        app.get('/fegui_sajusa/api/v2/user/:id/cart', [auth_1.userJWT], this.shoppingController.cart);
        app.post('/fegui_sajusa/api/v2/user/:ID/product/:id/add-cart', [auth_1.userJWT], this.shoppingController.addCart);
        app.patch('/fegui_sajusa/api/v2/user/:ID/update-cart/:id', [auth_1.userJWT], this.shoppingController.updateCart);
        app.delete('/fegui_sajusa/api/v2/user/:ID/delete-cart/:id', [auth_1.userJWT], this.shoppingController.deleteCart);
        //Get shopping
        //app.get('/fegui_sajusa/api/v2/user/:id/cart',[userJWT],  this.userController.user );
    }
}
exports.ShoppingRoute = ShoppingRoute;
