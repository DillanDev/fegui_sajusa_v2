"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogRoute = void 0;
const blog_controller_1 = require("../controller/blog.controller");
const auth_1 = require("../middleware/auth");
class BlogRoute {
    constructor() {
        this.blogController = new blog_controller_1.BlogController();
    }
    routes(app) {
        //Mostrar todos con el contenido con la shortDesc
        app.get('/fegui_sajusa/api/v2/post', this.blogController.post);
        //Mostrar uno completo sin shortDesc por id
        app.get('/fegui_sajusa/api/v2/post/:id', this.blogController.Byid);
        //===================
        //       ADMIN      |
        //===================
        app.post('/fegui_sajusa/api/v2/users/:ID/create-post', [auth_1.userJWT, auth_1.adminJWT], this.blogController.createPost);
        app.patch('/fegui_sajusa/api/v2/users/:ID/update-post/:id', [auth_1.userJWT, auth_1.adminJWT], this.blogController.updatePost);
        app.delete('/fegui_sajusa/api/v2/post/:id', [auth_1.userJWT, auth_1.adminJWT], this.blogController.deletePost);
    }
}
exports.BlogRoute = BlogRoute;
