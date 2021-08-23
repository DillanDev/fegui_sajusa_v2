"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckoutRoute = void 0;
const checkout_controller_1 = require("../controller/checkout.controller");
class CheckoutRoute {
    constructor() {
        this.checkoutController = new checkout_controller_1.CheckoutController();
    }
    routes(app) {
    }
}
exports.CheckoutRoute = CheckoutRoute;
