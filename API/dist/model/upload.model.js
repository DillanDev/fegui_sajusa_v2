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
exports.UploadModel = void 0;
const connection_1 = __importDefault(require("../config/connection"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class UploadModel {
    constructor() {
        this.Query = '';
    }
    img(id, res, name, tipe, err) {
        return __awaiter(this, void 0, void 0, function* () {
            if (err) {
                this.borraArchivo(name, tipe);
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            let ban = yield this.find(id, tipe);
            if (!(ban)) {
                this.borraArchivo(name, tipe);
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'No existe'
                    }
                });
            }
            if (ban) {
                let nameViejo = yield this.findName(tipe, id);
                if (nameViejo === '') {
                    yield this.save(id, tipe, name, res);
                }
                else {
                    this.borraArchivo(nameViejo, tipe);
                    yield this.save(id, tipe, name, res);
                }
            }
        });
    }
    find(id, tipe) {
        return __awaiter(this, void 0, void 0, function* () {
            this.Query = `SELECT id FROM ${tipe} WHERE id = '${id}';`;
            let result = yield connection_1.default.executeQuery(this.Query);
            try {
                if (result[0].constructor.name === 'RowDataPacket') {
                    return true;
                }
            }
            catch (error) {
                return false;
            }
        });
    }
    save(id, tipe, name, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.Query = `UPDATE ${tipe} SET image='${name}' WHERE id = '${id}';`;
                yield connection_1.default.executeQuery(this.Query);
                return true;
            }
            catch (error) {
                return res.status(500).json({
                    ok: false,
                    message: 'Error'
                });
            }
        });
    }
    findName(tipe, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.Query = `SELECT image FROM ${tipe} WHERE id = ${id}`;
                let result = yield connection_1.default.executeQuery(this.Query);
                return result[0].image;
            }
            catch (error) {
                return '';
            }
        });
    }
    borraArchivo(nombreImagen, tipo) {
        let pathImagen = path_1.default.resolve(__dirname, `../../uploads/${tipo}/${nombreImagen}`);
        if (fs_1.default.existsSync(pathImagen)) {
            fs_1.default.unlinkSync(pathImagen);
        }
    }
}
exports.UploadModel = UploadModel;
