import { Application } from "express";

import { CustomerController } from "../controller/customer.controller";
import { customerJWT } from "../middleware/customer";

export class CustomerRoute{
    
    public customerController: CustomerController = new CustomerController();

    public routes(app:Application){
        
        //Cliente
        app.get('/fegui_sajusa/api/v1/customers',  this.customerController.index );
        app.get('/fegui_sajusa/api/v1/customers/:id',  this.customerController.Byid );
        app.patch('/fegui_sajusa/api/v1/customers/:id',[customerJWT],  this.customerController.update );
        app.patch('/fegui_sajusa/api/v1/delete/:id/customers',[customerJWT],  this.customerController.deleteByid );

        //Metodo de pago
        app.post('/fegui_sajusa/api/v1/customers/:id/payments',[customerJWT],  this.customerController.createPayment);
        app.get('/fegui_sajusa/api/v1/customers/:id/payments',[customerJWT],  this.customerController.ByidPayment );
        app.patch('/fegui_sajusa/api/v1/customers/payments/:id',[customerJWT],  this.customerController.updatePayment);
        app.delete('/fegui_sajusa/api/v1/customers/payments/:id',[customerJWT],  this.customerController.deleteByidPayment);

        //Envío
        // app.post('/fegui_sajusa/api/v1/customers/:id/orders',[customerJWT],  this.customerController.createPayment);
        // app.get('/fegui_sajusa/api/v1/customers/:id/orders',[customerJWT],  this.customerController.ByidPayment );
        // app.patch('/fegui_sajusa/api/v1/customers/orders/:id',[customerJWT],  this.customerController.updatePayment);
        // app.delete('/fegui_sajusa/api/v1/customers/orders/:id',[customerJWT],  this.customerController.updatePayment);

        /*ORDERS*/

        app.get('/fegui_sajusa/api/v1/customers/:id/orders',[customerJWT],  this.customerController.orders );
        app.get('/fegui_sajusa/api/v1/customers/:ID/orders/:id',[customerJWT],  this.customerController.order );
        //Crear 
        app.post('/fegui_sajusa/api/v1/customers/:id/orders',[customerJWT],  this.customerController.createOrders );
        //Actualizar
        app.patch('/fegui_sajusa/api/v1/customers/:ID/orders/:id',[customerJWT],  this.customerController.updateOrders );
        //Eliminar
        app.delete('/fegui_sajusa/api/v1/customers/:ID/orders/:id',[customerJWT],  this.customerController.deleteOrders );        

         //Details
        // app.get('/fegui_sajusa/api/v1/customers/:id/orders',[customerJWT],  this.customerController.ByidPayment );

        /*COMENTARIOS*/
        //Mostrar todos los comentarios de una publicación
        app.get('/fegui_sajusa/api/v1/post/:id/comments',  this.customerController.comments );
        //Crear 
        app.post('/fegui_sajusa/api/v1/customers/:ID/post/:id/comments',[customerJWT],  this.customerController.createComment );
        //Actualizar
        app.patch('/fegui_sajusa/api/v1/comments/:id',[customerJWT],  this.customerController.updateComment );
        //Eliminar
        app.delete('/fegui_sajusa/api/v1/post/:ID/comments/:id',[customerJWT],  this.customerController.deleteComment );
        
    }
}