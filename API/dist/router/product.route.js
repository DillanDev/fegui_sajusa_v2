"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRoute = void 0;
const product_controller_1 = require("../controller/product.controller");
const customer_1 = require("../middleware/customer");
const admin_1 = require("../middleware/admin");
class ProductRoute {
    constructor() {
        this.productController = new product_controller_1.ProductController();
    }
    routes(app) {
        /*Esto es publico*/
        app.get('/fegui_sajusa/api/v1/categories', this.productController.categories);
        app.get('/fegui_sajusa/api/v1/categories/:id/products', this.productController.products);
        app.get('/fegui_sajusa/api/v1/products/:name', this.productController.Byid);
        /*Esto es para el administrador*/
        app.get('/fegui_sajusa/api/v1/employees/:id/products/', [admin_1.employeeJWT], this.productController.listEmployee);
        app.post('/fegui_sajusa/api/v1/employees/:id/categories/:name/products', [admin_1.employeeJWT], this.productController.create);
        app.patch('/fegui_sajusa/api/v1/categories/:name/products/:id', [admin_1.employeeJWT], this.productController.update);
        app.delete('/fegui_sajusa/api/v1/products/:id', [admin_1.employeeJWT], this.productController.deleteByid);
        /*Esto es para el cliente*/
        //Carrito
        app.post('/fegui_sajusa/api/v1/cart/products/:id', [customer_1.customerJWT], this.productController.cart);
        app.delete('/fegui_sajusa/api/v1/cart/products/:id', [customer_1.customerJWT], this.productController.eliminateCart);
        //Shopping Seccion
        app.get('/fegui_sajusa/api/v1/customers/:id/shopping/', [customer_1.customerJWT], this.productController.shopping);
    }
}
exports.ProductRoute = ProductRoute;
