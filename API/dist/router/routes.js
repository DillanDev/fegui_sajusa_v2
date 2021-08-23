"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Route = void 0;
const auth_route_1 = require("./auth.route");
const product_route_1 = require("./product.route");
const user_route_1 = require("./user.route");
const upload_route_1 = require("./upload.route");
class Route {
    constructor() {
        this.AuthRoutes = new auth_route_1.AuthRoute();
        this.ProductRoutes = new product_route_1.ProductRoute();
        this.UserRoutes = new user_route_1.UserRoute();
        this.UploadRoutes = new upload_route_1.UploadRoute();
    }
}
exports.Route = Route;
