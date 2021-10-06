"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadRoute = void 0;
const upload_controller_1 = require("../controller/upload.controller");
class UploadRoute {
    constructor() {
        this.uploadController = new upload_controller_1.UploadController();
    }
    routes(app, res, req) {
        app.get('/fegui_sajusa/api/v2/image/:tipe/:img', this.uploadController.show);
        app.delete('/fegui_sajusa/api/v2/image/:tipe/:img', this.uploadController.delete);
    }
}
exports.UploadRoute = UploadRoute;
