"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRoute = void 0;
const product_controller_1 = require("../controller/product.controller");
const auth_1 = require("../middleware/auth");
class ProductRoute {
    constructor() {
        this.productController = new product_controller_1.ProductController();
    }
    routes(app) {
        //Get 4 product aleat
        app.get('/fegui_sajusa/api/v2/slider-products', this.productController.productSlider);
        //Byid products
        app.get('/fegui_sajusa/api/v2/products/:id', this.productController.Byid);
        //Search short products
        app.get('/fegui_sajusa/api/v2/search-short-products/:name', this.productController.searchShort);
        //Search products
        app.get('/fegui_sajusa/api/v2/search-products/:name', this.productController.search);
        //Categories general
        app.get('/fegui_sajusa/api/v2/categories', this.productController.allCategories);
        //Specific category 
        app.get('/fegui_sajusa/api/v2/categories/:id', this.productController.category);
        //===================
        //       ADMIN      |
        //===================
        //CRUD category
        app.post('/fegui_sajusa/api/v2/create-category', [auth_1.userJWT, auth_1.adminJWT], this.productController.createCategory);
        app.patch('/fegui_sajusa/api/v2/uptade-category/:id', [auth_1.userJWT, auth_1.adminJWT], this.productController.updateCategory);
        app.delete('/fegui_sajusa/api/v2/delete-category/:id', [auth_1.userJWT, auth_1.adminJWT], this.productController.deleteCategory);
        //CRUD product
        app.post('/fegui_sajusa/api/v2/categories/:id/products', [auth_1.userJWT, auth_1.adminJWT], this.productController.createProduct);
        app.patch('/fegui_sajusa/api/v2/update-products/:id', [auth_1.userJWT, auth_1.adminJWT], this.productController.updateProduct);
        app.delete('/fegui_sajusa/api/v2/delete-products/:id', [auth_1.userJWT, auth_1.adminJWT], this.productController.deleteProduct);
    }
}
exports.ProductRoute = ProductRoute;
