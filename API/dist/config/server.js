"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = require("../router/routes");
class App {
    constructor(port) {
        this.port = port;
        this.route = new routes_1.Route();
        this.app = express_1.default();
        this.settings();
        this.middlewares();
        this.routes();
    }
    settings() {
        this.app.set('port', this.port || process.env.PORT || 3000);
    }
    middlewares() {
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
        this.app.use(express_fileupload_1.default());
        this.app.use(cors_1.default());
        this.app.use(morgan_1.default('tiny'));
    }
    routes() {
        this.route.AuthRoutes.routes(this.app);
        this.route.ProductRoutes.routes(this.app);
        this.route.UserRoutes.routes(this.app);
        this.route.UploadRoutes.routes(this.app);
        this.route.UploadRoutes.routes(this.app);
        this.route.BlogRoutes.routes(this.app);
        this.route.ShoppingRoutes.routes(this.app);
    }
    listen() {
        return __awaiter(this, void 0, void 0, function* () {
            const PORT = this.app.get('port');
            this.app.listen(PORT);
            console.log(`SERVER UP IN PORT: ${PORT}`);
        });
    }
}
exports.App = App;
