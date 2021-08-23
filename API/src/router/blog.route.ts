import { Application } from "express";

import { BlogController } from "../controller/blog.controller";
import { userJWT } from "../middleware/auth";

export class BlogRoute{
    
    public blogController: BlogController = new BlogController();

    public routes(app:Application){
        
       
        
        // /*POST*/
        // //Mostrar todos con el contenido con la shortDesc
        // app.get('/fegui_sajusa/api/v1/post',  this.employeeController.posts );
        // //Mostrar uno completo sin shortDesc por id
        // app.get('/fegui_sajusa/api/v1/post/:id',  this.employeeController.post );
        // //Crear 
        // app.post('/fegui_sajusa/api/v1/employees/:id/post',[userJWT],  this.employeeController.createPost );
        // //Actualizar
        // app.patch('/fegui_sajusa/api/v1/post/:id',[userJWTuserJWT],  this.employeeController.updatePost );
        // //Eliminar
        // app.delete('/fegui_sajusa/api/v1/post/:id',[userJWT],  this.employeeController.deletePost );
        
      
        
    }
}