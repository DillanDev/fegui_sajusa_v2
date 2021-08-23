import { Application } from "express";

import { ProductController } from "../controller/product.controller";
import { userJWT,adminJWT } from "../middleware/auth";

export class ProductRoute{
    
    public productController: ProductController = new ProductController();

    public routes(app:Application){


        //Get 4 product aleat
        app.get('/fegui_sajusa/api/v2/slider-products',  this.productController.productSlider );
        //Byid products
        app.get('/fegui_sajusa/api/v2/products/:id',  this.productController.Byid );
        //Search short products
        app.get('/fegui_sajusa/api/v2/search-short-products/:name',  this.productController.searchShort );
        //Search products
        app.get('/fegui_sajusa/api/v2/search-products/:name',  this.productController.search );
        //Categories general
        app.get('/fegui_sajusa/api/v2/categories',  this.productController.allCategories );
        //Specific category 
        app.get('/fegui_sajusa/api/v2/categories/:id',  this.productController.category );
        

        //===================
        //       ADMIN      |
        //===================

        //CRUD category
        app.post('/fegui_sajusa/api/v2/create-category',[userJWT,adminJWT],  this.productController.createCategory );
        app.patch('/fegui_sajusa/api/v2/uptade-category/:id',[userJWT,adminJWT],  this.productController.updateCategory );
        app.delete('/fegui_sajusa/api/v2/delete-category/:id',[userJWT,adminJWT],  this.productController.deleteCategory );

        //CRUD product
        app.post('/fegui_sajusa/api/v2/categories/:id/products',[userJWT,adminJWT],  this.productController.createProduct );
        app.patch('/fegui_sajusa/api/v2/update-products/:id',[userJWT,adminJWT],  this.productController.updateProduct );
        app.delete('/fegui_sajusa/api/v2/delete-products/:id',[userJWT,adminJWT],  this.productController.deleteProduct );

        
    }
}