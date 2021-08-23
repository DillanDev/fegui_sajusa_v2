"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoute = void 0;
const user_controller_1 = require("../controller/user.controller");
const auth_1 = require("../middleware/auth");
class UserRoute {
    constructor() {
        this.userController = new user_controller_1.UserController();
    }
    routes(app) {
        app.get('/fegui_sajusa/api/v2/user/:id', [auth_1.userJWT], this.userController.user);
        app.patch('/fegui_sajusa/api/v2/updata/user/:id', [auth_1.userJWT], this.userController.updateUser);
        app.patch('/fegui_sajusa/api/v2/delete/user/:id', [auth_1.userJWT], this.userController.delete);
    }
}
exports.UserRoute = UserRoute;
