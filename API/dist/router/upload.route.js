"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadRoute = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const upload_controller_1 = require("../controller/upload.controller");
class UploadRoute {
    constructor() {
        this.uploadController = new upload_controller_1.UploadController();
    }
    routes(app, res, req) {
        app.get('/fegui_sajusa/api/v2/image/:tipe/:img', (req, res) => {
            let tipo = req.params.tipe;
            let img = req.params.img;
            let pathImagen = path_1.default.resolve(__dirname, `../../uploads/${tipo}/${img}`);
            if (fs_1.default.existsSync(pathImagen)) {
                res.sendFile(pathImagen);
            }
            else {
                let noImagePath = path_1.default.resolve(__dirname, `../../uploads/no_image.jpg `);
                res.sendFile(noImagePath);
            }
        });
    }
}
exports.UploadRoute = UploadRoute;
