"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Route = void 0;
const customer_route_1 = require("./customer.route");
const auth_route_1 = require("./auth.route");
const product_route_1 = require("./product.route");
const employee_route_1 = require("./employee.route");
class Route {
    constructor() {
        this.CustomerRoute = new customer_route_1.CustomerRoute();
        this.AuthRoutes = new auth_route_1.AuthRoute();
        this.ProductRoutes = new product_route_1.ProductRoute();
        this.EmployeeRoute = new employee_route_1.EmployeeRoute();
    }
}
exports.Route = Route;
