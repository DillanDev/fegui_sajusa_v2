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
exports.BlogModel = void 0;
const connection_1 = __importDefault(require("../config/connection"));
const upload_controller_1 = require("../controller/upload.controller");
const upload_model_1 = require("./upload.model");
const MODEL = new upload_controller_1.UploadController;
const UPLOAD = new upload_model_1.UploadModel;
class BlogModel {
    // Menú + Contenido
    static post(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let page = Number(req.query.page);
                let limit = Number(req.query.limit);
                let _page = page * limit - limit;
                // const startIndex = (page - 1)*limit;
                // const endIndex = page * limit;
                this.Query = `SELECT * FROM post`;
                this.result = yield connection_1.default.executeQuery(this.Query);
                let cont = 0;
                for (let _ in this.result)
                    cont = cont + 1;
                this.Query = `
            SELECT * FROM post 
            LIMIT ${limit} OFFSET ${_page}`;
                this.result = yield connection_1.default.executeQuery(this.Query);
                let post = this.result;
                this.Query = `SELECT * FROM images`;
                this.result = yield connection_1.default.executeQuery(this.Query);
                let images = new Array(this.result.length - 1);
                for (let _ in post) {
                    this.Query = `SELECT images_id FROM post_images WHERE post_id = '${post[_].id}'`;
                    this.result = yield connection_1.default.executeQuery(this.Query);
                    for (let __ in this.result) {
                        this.Query = `SELECT id,image FROM images WHERE id = '${this.result[__].images_id}'`;
                        this.aux = yield connection_1.default.executeQuery(this.Query);
                        //Insertando el dato
                        images[this.cont - 1] = { post_id: post[_].id, id: this.aux[0].id, image: this.aux[0].image };
                        this.cont = this.cont + 1;
                    }
                }
                return res.status(200).json({
                    ok: true,
                    page,
                    totalItems: cont,
                    post,
                    post_images: images
                });
            }
            catch (error) {
                return res.status(400).json({
                    ok: false,
                    message: 'Something goes wrong!'
                });
            }
        });
    }
    // Producto especifico
    static Byid(id, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.Query = "SELECT * FROM `post` WHERE id='" + id + "'";
                this.result = yield connection_1.default.executeQuery(this.Query);
                let _post = this.result;
                if (this.result.length > 0) {
                    let post = this.result;
                    this.Query = `SELECT * FROM images`;
                    this.result = yield connection_1.default.executeQuery(this.Query);
                    this.Query = `SELECT images_id FROM post_images WHERE post_id = '${post[0].id}'`;
                    this.result = yield connection_1.default.executeQuery(this.Query);
                    let images = new Array(this.result.length);
                    for (let _ in this.result) {
                        this.Query = `SELECT id,image FROM images WHERE id = '${this.result[_].images_id}'`;
                        this.aux = yield connection_1.default.executeQuery(this.Query);
                        //Insertando el dato
                        images[this.cont] = { post_id: post[0].id, id: this.aux[0].id, image: this.aux[0].image };
                        this.cont = this.cont + 1;
                    }
                    return res.status(200).json({
                        ok: true,
                        post: _post,
                        images: images
                    });
                }
                else {
                    return res.status(404).json({
                        ok: false,
                        message: 'Product not found!'
                    });
                }
            }
            catch (error) {
                return res.status(400).json({
                    ok: false,
                    message: 'Something goes wrong!'
                });
            }
        });
    }
    //===================
    //       ADMIN      |
    //===================
    static createPost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            this.Query = `
            INSERT INTO 
            post(users_id, title, content) 
            VALUES (?,?,?)`;
            this.inserts = [`${req.params.ID}`, `${req.body.title}`, `${req.body.content}`];
            this.Query = connection_1.default.instance.cnn.format(this.Query, this.inserts);
            this.result = yield connection_1.default.executeQuery(this.Query);
            this.Query = `SELECT id FROM post WHERE id = '${this.result.insertId}'`;
            this.result = yield connection_1.default.executeQuery(this.Query);
            const post_id = this.result[0].id;
            if (req.files) {
                if (req.files.files.length) {
                    for (let __ in req.files.files) {
                        yield MODEL.load(req, res, 'post', post_id, req.files.files[__]);
                    }
                }
                else {
                    yield MODEL.load(req, res, 'post', post_id, req.files.files);
                }
            }
            return res.status(200)
                .json({
                ok: true,
                message: 'Datos guardados correctamente'
            });
        });
    }
    static updatePost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //await ProductModel.updateProduct(req.body,req.params.id,req.params.name,res,req);
            //public async updateProduct(body:any,id:any,name:string,res:any,req:any){
            var body = req.body;
            var id = req.params.id;
            try {
                var i = 0;
                for (var value in body) {
                    this.inserts[i] = '';
                    this.inserts[i] += value;
                    i++;
                    this.inserts[i] = '';
                    this.inserts[i] += body[value];
                    i++;
                }
                this.Query = ` UPDATE post SET users_id='${req.params.ID}'`;
                for (let i = 1; i <= Object.keys(body).length; i++) {
                    this.Query += ',??=?';
                }
                this.Query += ` WHERE id = '${id}'`;
                this.Query = connection_1.default.instance.cnn.format(this.Query, this.inserts);
                yield connection_1.default.executeQuery(this.Query);
                if (req.files) {
                    if (req.files.files.length) {
                        for (let __ in req.files.files) {
                            yield MODEL.load(req, res, 'post', id, req.files.files[__]);
                        }
                    }
                    else {
                        yield MODEL.load(req, res, 'post', id, req.files.files);
                    }
                }
                return res.status(200).json({
                    ok: true,
                    message: 'Datos actualizados correctamente'
                });
            }
            catch (error) {
                return res.status(400)
                    .json({
                    ok: false,
                    message: 'Something goes wrong!'
                });
            }
        });
    }
    static deletePost(id, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Seleccionando todas las imagenes
                this.Query = `SELECT images_id FROM post_images WHERE post_id = '${id}'`;
                this.result = yield connection_1.default.executeQuery(this.Query);
                let images_id = this.result;
                //Borrando imagenes de la tabla images!
                for (let _ in images_id) {
                    this.Query = `SELECT image FROM images WHERE id = '${images_id[_].images_id}'`;
                    this.result = yield connection_1.default.executeQuery(this.Query);
                    UPLOAD.borraArchivo(this.result[0].image, 'post');
                    this.Query = `DELETE FROM images WHERE id = '${images_id[_].images_id}'`;
                    yield connection_1.default.executeQuery(this.Query);
                }
                this.Query = `DELETE FROM post WHERE id = '${id}'`;
                yield connection_1.default.executeQuery(this.Query);
                return res.status(200)
                    .json({
                    ok: true,
                    message: 'Datos eliminados correctamente'
                });
            }
            catch (error) {
                return res.status(400)
                    .json({
                    ok: false,
                    message: 'Something goes wrong!'
                });
            }
        });
    }
}
exports.BlogModel = BlogModel;
BlogModel.Query = '';
BlogModel.inserts = [''];
BlogModel.result = '';
BlogModel.aux = '';
BlogModel.cont = 0;
