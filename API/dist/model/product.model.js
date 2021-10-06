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
exports.ProductModel = void 0;
const connection_1 = __importDefault(require("../config/connection"));
const upload_controller_1 = require("../controller/upload.controller");
const upload_model_1 = require("./upload.model");
const MODEL = new upload_controller_1.UploadController;
const UPLOAD = new upload_model_1.UploadModel;
class ProductModel {
    //===================
    //      PUBLIC      |
    //===================
    // Menú
    static allCategories(res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.Query = "SELECT * FROM categories";
                let result = yield connection_1.default.executeQuery(this.Query);
                return res.status(200).json({ ok: true, categories: result });
            }
            catch (error) {
                return res.status(400).json({
                    ok: false,
                    message: 'Something goes wrong!'
                });
            }
        });
    }
    // Menú + Contenido
    static category(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.Query = `SELECT id,name FROM categories WHERE id = '${req.params.id}'`;
                this.result = yield connection_1.default.executeQuery(this.Query);
                if (this.result.length > 0) {
                    if (this.result[0].constructor.name === 'RowDataPacket') {
                        let _aux = this.result[0].id;
                        let aux = this.result[0].name;
                        let page = Number(req.query.page);
                        let limit = Number(req.query.limit);
                        let _page = page * limit - limit;
                        // const startIndex = (page - 1)*limit;
                        // const endIndex = page * limit;
                        this.Query = `SELECT * FROM products WHERE categories_id = '${req.params.id}'`;
                        this.result = yield connection_1.default.executeQuery(this.Query);
                        let cont = 0;
                        for (let _ in this.result)
                            cont = cont + 1;
                        this.Query = `
                    SELECT * FROM products 
                    WHERE categories_id = '${req.params.id}' 

                    LIMIT ${limit} OFFSET ${_page}`;
                        this.result = yield connection_1.default.executeQuery(this.Query);
                        let products = this.result;
                        this.Query = `SELECT * FROM images`;
                        this.result = yield connection_1.default.executeQuery(this.Query);
                        let images = new Array(this.result.length - 1);
                        images = [];
                        for (let _ in products) {
                            this.Query = `SELECT images_id FROM products_images WHERE products_id = '${products[_].id}'`;
                            this.result = yield connection_1.default.executeQuery(this.Query);
                            for (let __ in this.result) {
                                this.Query = `SELECT id,image FROM images WHERE id = '${this.result[__].images_id}'`;
                                this.aux = yield connection_1.default.executeQuery(this.Query);
                                //Insertando el dato
                                images[_] = { products_id: products[_].id, id: this.aux[0].id, image: this.aux[0].image };
                            }
                        }
                        return res.status(200).json({
                            ok: true,
                            page,
                            totalItems: cont,
                            id: _aux,
                            categories_id: aux,
                            products,
                            products_images: images
                        });
                    }
                }
                else {
                    return res.status(404).json({
                        ok: false,
                        message: 'Category not found!'
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
    // Busqueda + sugerencias
    static searchShort(name, res) {
        return __awaiter(this, void 0, void 0, function* () {
            this.Query = `SELECT id,name FROM products WHERE name LIKE '%${name}%' LIMIT 4`;
            let result = yield connection_1.default.executeQuery(this.Query);
            return res.status(200).json({
                ok: true,
                products: result
            });
        });
    }
    // Busqueda + Contenido
    static search(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let page = Number(req.query.page);
                let limit = Number(req.query.limit);
                let _page = page * limit - limit;
                //Contador
                this.Query = `SELECT * FROM products WHERE  name LIKE '%${req.params.name}%' LIMIT ${limit} OFFSET ${_page}`;
                let result = yield connection_1.default.executeQuery(this.Query);
                let cont = 0;
                for (let _ in result)
                    cont = cont + 1;
                let products = result;
                this.Query = `SELECT * FROM images`;
                this.result = yield connection_1.default.executeQuery(this.Query);
                var images;
                if (limit > cont) {
                    images = new Array(cont - 1);
                }
                else {
                    images = new Array(limit - 1);
                }
                images = [];
                for (let _ in products) {
                    this.Query = `SELECT images_id FROM products_images WHERE products_id = '${products[_].id}'`;
                    this.result = yield connection_1.default.executeQuery(this.Query);
                    for (let __ in this.result) {
                        this.Query = `SELECT id,image FROM images WHERE id = '${this.result[__].images_id}'`;
                        this.aux = yield connection_1.default.executeQuery(this.Query);
                        //Insertando el dato
                        images[__] = { products_id: products[_].id, id: this.aux[0].id, image: this.aux[0].image };
                    }
                }
                this.Query = `SELECT * FROM products WHERE name LIKE '%${req.params.name}%' LIMIT ${limit} OFFSET ${_page}`;
                result = yield connection_1.default.executeQuery(this.Query);
                return res.status(200).json({
                    ok: true,
                    page: page,
                    totalItems: cont,
                    products: result,
                    products_images: images
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
                this.Query = "SELECT * FROM `products` WHERE id='" + id + "'";
                this.result = yield connection_1.default.executeQuery(this.Query);
                let _products = this.result;
                if (this.result.length > 0) {
                    let products = this.result;
                    this.Query = `SELECT * FROM images`;
                    this.result = yield connection_1.default.executeQuery(this.Query);
                    this.Query = `SELECT images_id FROM products_images WHERE products_id = '${products[0].id}'`;
                    this.result = yield connection_1.default.executeQuery(this.Query);
                    var images = new Array(this.result.length - 1);
                    images = [];
                    for (let _ in this.result) {
                        this.Query = `SELECT id,image FROM images WHERE id = '${this.result[_].images_id}'`;
                        this.aux = yield connection_1.default.executeQuery(this.Query);
                        //Insertando el dato
                        images[_] = { products_id: products[0].id, id: this.aux[0].id, image: this.aux[0].image };
                    }
                    return res.status(200).json({
                        ok: true,
                        products: _products,
                        images
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
    static random(min, max) {
        return Math.random() * (max - min) + min;
    }
    // Producto slider
    static productSlider(id, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Contador
                this.Query = `SELECT count(id) FROM products`;
                this.result = yield connection_1.default.executeQuery(this.Query);
                let cont = Object.values(this.result[0]);
                let array = new Array(4);
                for (let i = 0; i <= 3; i++) {
                    array[i] = Math.trunc(this.random(1, cont));
                }
                for (let i = 0; i < 4; i++) {
                    this.Query = `SELECT * FROM products LIMIT ${array[i]},1 `;
                    this.result = yield connection_1.default.executeQuery(this.Query);
                    array[i] = this.result[0];
                }
                let products = array;
                if (array.length > 0) {
                    var contAux = 0;
                    let _images = new Array(4);
                    _images = [];
                    for (let i = 0; i < 4; i++) {
                        this.Query = `SELECT images_id FROM products_images WHERE products_id = '${products[i].id}'`;
                        this.result = yield connection_1.default.executeQuery(this.Query);
                        _images[i] = this.result[0].images_id;
                    }
                    for (let i = 0; i < 4; i++) {
                        this.Query = `SELECT id,image FROM images WHERE id = '${_images[i]}'`;
                        this.aux = yield connection_1.default.executeQuery(this.Query);
                        //Insertando el dato            
                        _images[i] = { products_id: products[i].id, id: this.aux[0].id, image: this.aux[0].image };
                    }
                    return res.status(200).json({
                        ok: true,
                        products: products,
                        images: _images
                    });
                }
                else {
                    return res.status(404).json({
                        ok: false,
                        message: 'Not products in stock!'
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
    // Categoría!
    static createCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.Query = `SELECT id,name FROM categories WHERE name = '${req.body.name}'`;
                this.result = yield connection_1.default.executeQuery(this.Query);
                if (this.result.length > 0) {
                    if (this.result[0].constructor.name === 'RowDataPacket') {
                        return res.status(406).json({
                            ok: false,
                            id: this.result[0].id,
                            categories: this.result[0].name,
                            message: 'Name duplicate!'
                        });
                    }
                }
                this.Query = `INSERT INTO categories(name) VALUES ('${req.body.name}')`;
                this.result = yield connection_1.default.executeQuery(this.Query);
                if (this.result.constructor.name === 'OkPacket') {
                    this.Query = `SELECT id,name FROM categories WHERE name = '${req.body.name}'`;
                    this.result = yield connection_1.default.executeQuery(this.Query);
                    return res.status(200).json({
                        ok: true,
                        id: this.result[0].id,
                        categories: this.result[0].name,
                        message: 'Success!'
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
    static updateCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.Query = `SELECT id,name FROM categories WHERE name = '${req.body.name}'`;
                this.result = yield connection_1.default.executeQuery(this.Query);
                if (this.result.length > 0) {
                    if (this.result[0].constructor.name === 'RowDataPacket') {
                        return res.status(406).json({
                            ok: false,
                            id: this.result.id,
                            categories: this.result.name,
                            message: 'Name duplicate!'
                        });
                    }
                }
                this.Query = `UPDATE categories SET name='${req.body.name}'  WHERE id='${req.params.id}'`;
                this.result = yield connection_1.default.executeQuery(this.Query);
                if (this.result.constructor.name === 'OkPacket') {
                    this.Query = `SELECT id,name FROM categories WHERE name = '${req.body.name}'`;
                    this.result = yield connection_1.default.executeQuery(this.Query);
                    return res.status(200).json({
                        ok: true,
                        id: this.result[0].id,
                        categories: this.result[0].name,
                        message: 'Success!'
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
    static deleteCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.Query = `SELECT id,name FROM categories WHERE id = '${req.params.id}'`;
                this.result = yield connection_1.default.executeQuery(this.Query);
                let aux = this.result;
                if (this.result.length > 0) {
                    if (this.result[0].constructor.name === 'RowDataPacket') {
                        this.Query = `DELETE FROM categories WHERE id= '${req.params.id}'`;
                        this.result = yield connection_1.default.executeQuery(this.Query);
                        return res.status(200).json({
                            ok: true,
                            id: aux.id,
                            categories: aux.name,
                            message: 'Element delete!'
                        });
                    }
                }
                else {
                    return res.status(404).json({
                        ok: false,
                        message: 'Element not found!'
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
    // Producto!
    static createProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            this.Query = `SELECT id,name FROM categories WHERE id='${req.params.id}'`;
            this.result = yield connection_1.default.executeQuery(this.Query);
            const categories_id = this.result[0].id;
            const categories_name = this.result[0].name;
            this.Query = `
            INSERT INTO 
            products(categories_id, discount, inventory, name, price, weight, description) 
            VALUES (?,?,?,?,?,?,?)`;
            let discount = req.body.discount;
            if (discount.charAt(discount.length - 1) === '%') {
                discount = discount.replace("%", "");
                discount = Number(discount);
                discount = discount / 100;
            }
            else if (discount > 1) {
                discount = discount / 100;
            }
            this.inserts = [`${categories_id}`, `${discount}`, `${req.body.inventory}`, `${req.body.name}`, `${req.body.price}`, `${req.body.weight}`, `${req.body.description}`];
            this.Query = connection_1.default.instance.cnn.format(this.Query, this.inserts);
            this.result = yield connection_1.default.executeQuery(this.Query);
            this.Query = `SELECT id,name FROM products WHERE id = '${this.result.insertId}'`;
            this.result = yield connection_1.default.executeQuery(this.Query);
            const products_id = this.result[0].id;
            const products_name = this.result[0].name;
            const sku = (categories_name.charAt(0) + categories_name.charAt(1) + categories_id + "-" + products_id).toUpperCase();
            this.Query = `UPDATE products SET sku='${sku}' WHERE id='${products_id}'`;
            this.result = yield connection_1.default.executeQuery(this.Query);
            if (req.files.files.length) {
                for (let __ in req.files.files) {
                    yield MODEL.load(req, res, 'products', products_id, req.files.files[__]);
                }
            }
            else {
                yield MODEL.load(req, res, 'products', products_id, req.files.files);
            }
            return res.status(200)
                .json({
                ok: true,
                message: 'Datos guardados correctamente'
            });
        });
    }
    static updateProduct(res, req) {
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
                this.Query = ` UPDATE products SET `;
                for (let i = 1; i <= Object.keys(body).length; i++) {
                    this.Query += ',??=?';
                }
                this.Query += ` WHERE id = '${id}'`;
                this.Query = connection_1.default.instance.cnn.format(this.Query, this.inserts);
                yield connection_1.default.executeQuery(this.Query);
                if (req.files) {
                    if (req.files.files.length) {
                        for (let __ in req.files.files) {
                            yield MODEL.load(req, res, 'products', id, req.files.files[__]);
                        }
                    }
                    else {
                        yield MODEL.load(req, res, 'products', id, req.files.files);
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
    static deleteProduct(id, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Seleccionando todas las imagenes
                this.Query = `SELECT images_id FROM products_images WHERE products_id = '${id}'`;
                this.result = yield connection_1.default.executeQuery(this.Query);
                let images_id = this.result;
                //Borrando imagenes de la tabla images!
                for (let _ in images_id) {
                    this.Query = `SELECT image FROM images WHERE id = '${images_id[_].images_id}'`;
                    this.result = yield connection_1.default.executeQuery(this.Query);
                    UPLOAD.borraArchivo(this.result[0].image, 'products');
                    this.Query = `DELETE FROM images WHERE id = '${images_id[_].images_id}'`;
                    yield connection_1.default.executeQuery(this.Query);
                }
                this.Query = `DELETE FROM products WHERE id = '${id}'`;
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
exports.ProductModel = ProductModel;
ProductModel.Query = '';
ProductModel.inserts = [''];
ProductModel.result = '';
ProductModel.aux = '';
ProductModel.cont = 0;
