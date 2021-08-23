"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoute = void 0;
const auth_controller_1 = require("../controller/auth.controller");
const auth_1 = require("../middleware/auth");
class AuthRoute {
    constructor() {
        this.auth = new auth_controller_1.Auth();
    }
    routes(app) {
        app.post('/fegui_sajusa/api/v2/auth/login', this.auth.login);
        app.post('/fegui_sajusa/api/v2/register', this.auth.register);
        //Change password
        app.post('/fegui_sajusa/api/v2/change-password', [auth_1.userJWT], this.auth.changePassword);
        //Forgot Password
        app.put('/fegui_sajusa/api/v2/forgort-password', this.auth.forgortPassword);
        //Create new password
        app.put('/fegui_sajusa/api/v2/new-password', this.auth.createNewPassword);
    }
}
exports.AuthRoute = AuthRoute;
