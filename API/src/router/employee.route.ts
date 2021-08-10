import { Application } from "express";

import { EmployeeController } from "../controller/employee.controller";
import { employeeJWT } from "../middleware/admin";

export class EmployeeRoute{
    
    public employeeController: EmployeeController = new EmployeeController();

    public routes(app:Application){
        
        /*Administrador*/
        app.get('/fegui_sajusa/api/v1/employees',[employeeJWT],  this.employeeController.employees );
        app.get('/fegui_sajusa/api/v1/employees/:id',[employeeJWT],  this.employeeController.Byid );
        app.patch('/fegui_sajusa/api/v1/employees/:id',[employeeJWT],  this.employeeController.update );
        app.patch('/fegui_sajusa/api/v1/delete/employees/:id',[employeeJWT],  this.employeeController.delete );
        
        /*POST*/
        //Mostrar todos con el contenido con la shortDesc
        app.get('/fegui_sajusa/api/v1/post',  this.employeeController.posts );
        //Mostrar uno completo sin shortDesc por id
        app.get('/fegui_sajusa/api/v1/post/:id',  this.employeeController.post );
        //Crear 
        app.post('/fegui_sajusa/api/v1/employees/:id/post',[employeeJWT],  this.employeeController.createPost );
        //Actualizar
        app.patch('/fegui_sajusa/api/v1/post/:id',[employeeJWT],  this.employeeController.updatePost );
        //Eliminar
        app.delete('/fegui_sajusa/api/v1/post/:id',[employeeJWT],  this.employeeController.deletePost );
        
        /*COMENTARIOS*/
        //Mostrar todos los comentarios de una publicación
        app.get('/fegui_sajusa/api/v1/post/:id/comments',  this.employeeController.comments );
        //Crear 
        app.post('/fegui_sajusa/api/v1/employees/:ID/post/:id/comments',[employeeJWT],  this.employeeController.createComment );
        //Actualizar
        app.patch('/fegui_sajusa/api/v1/comments/:id',[employeeJWT],  this.employeeController.updateComment );
        //Eliminar
        app.delete('/fegui_sajusa/api/v1/post/:ID/comments/:id',[employeeJWT],  this.employeeController.deleteComment );

    }
}