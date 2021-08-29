import { Application } from "express"

import { BlogController } from "../controller/blog.controller";
import { userJWT,adminJWT } from "../middleware/auth";

export class BlogRoute{
    
    public blogController: BlogController = new BlogController();

    public routes(app:Application){


        //Mostrar todos con el contenido con la shortDesc
        app.get('/fegui_sajusa/api/v2/post',  this.blogController.post );
        //Mostrar uno completo sin shortDesc por id
        app.get('/fegui_sajusa/api/v2/post/:id',  this.blogController.Byid );

        //===================
        //       ADMIN      |
        //===================

        app.post('/fegui_sajusa/api/v2/users/:ID/create-post',[userJWT,adminJWT],  this.blogController.createPost );
        app.patch('/fegui_sajusa/api/v2/users/:ID/update-post/:id',[userJWT,adminJWT],  this.blogController.updatePost );
        app.delete('/fegui_sajusa/api/v2/post/:id',[userJWT,adminJWT],  this.blogController.deletePost );
        
      
        
    }
}