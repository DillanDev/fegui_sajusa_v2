"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogRoute = void 0;
const blog_controller_1 = require("../controller/blog.controller");
class BlogRoute {
    constructor() {
        this.blogController = new blog_controller_1.BlogController();
    }
    routes(app) {
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
exports.BlogRoute = BlogRoute;
