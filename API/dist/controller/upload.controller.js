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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadController = void 0;
const upload_model_1 = require("../model/upload.model");
const MODEL = new upload_model_1.UploadModel;
class UploadController {
    load(req, res, tipo, id, archivo) {
        return __awaiter(this, void 0, void 0, function* () {
            // let tipo = req.params.tipo;
            // let id = req.params.id;
            if (!req.files)
                return res.status(400).json({ ok: false, message: 'No se ha seleccionado ningún archivo' });
            // Valida tipo
            let tiposValidos = ['products', 'post'];
            if (tiposValidos.indexOf(tipo) < 0)
                return res.status(400).json({ ok: false, emessage: 'Los tipos permitidas son ' + tiposValidos.join(', ') });
            let nombreCortado = archivo.name.split('.');
            let extension = nombreCortado[nombreCortado.length - 1];
            // Extensiones permitidas
            let extensionesValidas = ['png', 'jpg', 'jpeg'];
            if (extensionesValidas.indexOf(extension) < 0) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'Las extensiones permitidas son ' + extensionesValidas.join(', '),
                        ext: extension
                    }
                });
            }
            // Cambiar nombre al archivo
            // 183912kuasidauso-123.jpg
            let nombreArchivo = `${id}-${new Date().getMilliseconds()}.${extension}`;
            archivo.mv(`uploads/${tipo}/${nombreArchivo}`, (err) => {
                if (err)
                    return res.status(500).json({
                        ok: false,
                        message: err
                    });
                // Aqui, imagen cargada
                if (tipo === 'post') {
                    MODEL.img(id, res, nombreArchivo, tipo);
                }
                else if (tipo === 'products') {
                    MODEL.img(id, res, nombreArchivo, tipo);
                }
            });
        });
    }
}
exports.UploadController = UploadController;
