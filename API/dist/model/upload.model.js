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
        this.result = [''];
    }
    img(id, res, name, tipe) {
        return __awaiter(this, void 0, void 0, function* () {
            // let ban = await this.find(id,tipe);
            // if(!(ban)){
            //      this.borraArchivo(name, tipe);
            //      return res.status(400).json({
            //          ok: false, message: 'Not exist!'
            //      });
            // }
            // if(ban){
            let nameViejo = yield this.findName(tipe, id);
            if (nameViejo === '') {
                yield this.save(id, tipe, name, res);
            }
            else {
                this.borraArchivo(nameViejo, tipe);
                yield this.save(id, tipe, name, res);
            }
            // }
        });
    }
    // public async find(id:string,tipe:string){
    //     this.Query = `SELECT id FROM ${tipe}_images WHERE ${tipe}_id = '${id}';`
    //     let result:any = await MySQL.executeQuery(this.Query);
    //     try {
    //         if(result[0].constructor.name === 'RowDataPacket' ){
    //             return true;
    //         }
    //     } catch (error) {
    //         return false;
    //     }
    // }
    save(id, tipe, name, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.Query = `INSERT INTO images(image) VALUES ('${name}')`;
                this.result = yield connection_1.default.executeQuery(this.Query);
                this.Query = `INSERT INTO ${tipe}_images ( ${tipe}_id, images_id) VALUES ('${id}','${this.result.insertId}')`;
                this.result = yield connection_1.default.executeQuery(this.Query);
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
                this.Query = `SELECT images_id FROM ${tipe}_images WHERE ${tipe}_id='${id}'`;
                this.result = yield connection_1.default.executeQuery(this.Query);
                this.Query = `SELECT image FROM images WHERE id = ${this.result[0].images_id}`;
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
    show(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
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
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let tipe = req.params.tipe;
            let name = req.params.img;
            this.Query = `DELETE FROM images WHERE image = "${name}"`;
            let result = yield connection_1.default.executeQuery(this.Query);
            this.borraArchivo(name, tipe);
            if (result.constructor.name === 'OkPacket') {
                return res.status(200).json({
                    ok: true,
                    message: 'Image delete!'
                });
            }
        });
    }
}
exports.UploadModel = UploadModel;
