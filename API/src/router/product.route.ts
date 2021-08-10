import { Application } from "express";

import { ProductController } from "../controller/product.controller";
import { customerJWT } from "../middleware/customer";
import { employeeJWT } from "../middleware/admin";

export class ProductRoute{
    
    public productController: ProductController = new ProductController();

    public routes(app:Application){
        
        /*Esto es publico*/
        app.get('/fegui_sajusa/api/v1/categories',  this.productController.categories );
        app.get('/fegui_sajusa/api/v1/categories/:id/products',  this.productController.products );
        app.get('/fegui_sajusa/api/v1/products/:name',  this.productController.Byid );

        /*Esto es para el administrador*/
        app.get('/fegui_sajusa/api/v1/employees/:id/products/',[employeeJWT],  this.productController.listEmployee );
        app.post('/fegui_sajusa/api/v1/employees/:id/categories/:name/products',[employeeJWT],  this.productController.create );
        app.patch('/fegui_sajusa/api/v1/categories/:name/products/:id',[employeeJWT],  this.productController.update );
        app.delete('/fegui_sajusa/api/v1/products/:id',[employeeJWT],  this.productController.deleteByid );

        /*Esto es para el cliente*/
        
        //Carrito
        app.post('/fegui_sajusa/api/v1/cart/products/:id',[customerJWT],  this.productController.cart );
        app.delete('/fegui_sajusa/api/v1/cart/products/:id',[customerJWT],  this.productController.eliminateCart );

        //Shopping Seccion
        app.get('/fegui_sajusa/api/v1/customers/:id/shopping/',[customerJWT],  this.productController.shopping );
        
    }
}