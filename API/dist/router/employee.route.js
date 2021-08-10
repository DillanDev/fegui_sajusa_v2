"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeRoute = void 0;
const employee_controller_1 = require("../controller/employee.controller");
const admin_1 = require("../middleware/admin");
class EmployeeRoute {
    constructor() {
        this.employeeController = new employee_controller_1.EmployeeController();
    }
    routes(app) {
        /*Administrador*/
        app.get('/fegui_sajusa/api/v1/employees', [admin_1.employeeJWT], this.employeeController.employees);
        app.get('/fegui_sajusa/api/v1/employees/:id', [admin_1.employeeJWT], this.employeeController.Byid);
        app.patch('/fegui_sajusa/api/v1/employees/:id', [admin_1.employeeJWT], this.employeeController.update);
        app.patch('/fegui_sajusa/api/v1/delete/employees/:id', [admin_1.employeeJWT], this.employeeController.delete);
        /*POST*/
        //Mostrar todos con el contenido con la shortDesc
        app.get('/fegui_sajusa/api/v1/post', this.employeeController.posts);
        //Mostrar uno completo sin shortDesc por id
        app.get('/fegui_sajusa/api/v1/post/:id', this.employeeController.post);
        //Crear 
        app.post('/fegui_sajusa/api/v1/employees/:id/post', [admin_1.employeeJWT], this.employeeController.createPost);
        //Actualizar
        app.patch('/fegui_sajusa/api/v1/post/:id', [admin_1.employeeJWT], this.employeeController.updatePost);
        //Eliminar
        app.delete('/fegui_sajusa/api/v1/post/:id', [admin_1.employeeJWT], this.employeeController.deletePost);
        /*COMENTARIOS*/
        //Mostrar todos los comentarios de una publicación
        app.get('/fegui_sajusa/api/v1/post/:id/comments', this.employeeController.comments);
        //Crear 
        app.post('/fegui_sajusa/api/v1/employees/:ID/post/:id/comments', [admin_1.employeeJWT], this.employeeController.createComment);
        //Actualizar
        app.patch('/fegui_sajusa/api/v1/comments/:id', [admin_1.employeeJWT], this.employeeController.updateComment);
        //Eliminar
        app.delete('/fegui_sajusa/api/v1/post/:ID/comments/:id', [admin_1.employeeJWT], this.employeeController.deleteComment);
    }
}
exports.EmployeeRoute = EmployeeRoute;
