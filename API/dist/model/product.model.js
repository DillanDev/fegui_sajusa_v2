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
    constructor() {
        this.Query = '';
        this.inserts = [''];
    }
    categories() {
        return __awaiter(this, void 0, void 0, function* () {
            this.Query = "SELECT * FROM categories";
            return yield connection_1.default.executeQuery(this.Query);
        });
    }
    products(name, res) {
        return __awaiter(this, void 0, void 0, function* () {
            this.Query = "SELECT `id` FROM `categories` WHERE name='" + name + "'";
            let result = yield connection_1.default.executeQuery(this.Query);
            result[0].id;
            this.Query = "SELECT * FROM `products` WHERE category_id = '" + result[0].id + "'";
            result = yield connection_1.default.executeQuery(this.Query);
            res.status(200).json({
                ok: true,
                categoria: name,
                result
            });
        });
    }
    Byid(name, res) {
        return __awaiter(this, void 0, void 0, function* () {
            this.Query = "SELECT * FROM `products` WHERE name LIKE '%" + name + "%'";
            let result = yield connection_1.default.executeQuery(this.Query);
            res.status(200).json({
                ok: true,
                product: result
            });
        });
    }
    productsEmployee(id, res) {
        return __awaiter(this, void 0, void 0, function* () {
            this.Query = `SELECT products_id FROM employeesxproducts WHERE  employees_id = '${id}'`;
            let result = yield connection_1.default.executeQuery(this.Query);
            let name;
            var x = [];
            var obj = [];
            for (let index = 0; index < result.length; index++) {
                this.Query = `SELECT name FROM products WHERE id = '${result[index].products_id}'`;
                name = yield connection_1.default.executeQuery(this.Query);
                obj[index] = { id: '', name: '' };
                obj[index].id += `${result[index].products_id}`;
                obj[index].name += `${name[0].name}`;
            }
            return res.status(200)
                .json({
                ok: true,
                employee_id: id,
                products: obj
            });
        });
    }
    create(ID, name, body, res, req) {
        return __awaiter(this, void 0, void 0, function* () {
            this.Query = `SELECT id FROM categories WHERE name='${name}'`;
            let result = yield connection_1.default.executeQuery(this.Query);
            this.Query = `
            INSERT INTO 
            products(category_id, discount, inventory, sku, name, price, weight, shortDesc, longDesc) 
            VALUES (?,?,?,?,?,?,?,?,?)`;
            this.inserts = [`${result[0].id}`, `${body.discount}`, `${body.inventory}`, `${body.sku}`, `${body.name}`, `${body.price}`, `${body.weight}`, `${body.shortDesc}`, `${body.longDesc}`];
            this.Query = connection_1.default.instance.cnn.format(this.Query, this.inserts);
            result = yield connection_1.default.executeQuery(this.Query);
            this.Query = `SELECT id FROM products WHERE name = '${body.name}'`;
            let id = yield connection_1.default.executeQuery(this.Query);
            this.Query = ` INSERT INTO employeesxproducts(employees_id, products_id) VALUES ('${ID}','${id[id.length - 1].id}') `;
            result = yield connection_1.default.executeQuery(this.Query);
            yield MODEL.load(req, res, 'products', id[id.length - 1].id);
            return res.status(200)
                .json({
                ok: true,
                message: 'Datos guardados correctamente'
            });
        });
    }
    update(body, id, name, res, req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.Query = `SELECT id FROM categories WHERE name='${name}'`;
                let result = yield connection_1.default.executeQuery(this.Query);
                var i = 0;
                for (var value in body) {
                    this.inserts[i] = '';
                    this.inserts[i] += value;
                    i++;
                    this.inserts[i] = '';
                    this.inserts[i] += body[value];
                    i++;
                }
                this.Query = ` UPDATE products SET category_id='${result[0].id}'`;
                for (let i = 1; i <= Object.keys(body).length; i++) {
                    this.Query += ',??=?';
                }
                this.Query += ` WHERE id = ${id}`;
                this.Query = connection_1.default.instance.cnn.format(this.Query, this.inserts);
                yield connection_1.default.executeQuery(this.Query);
                if (req.files) {
                    yield MODEL.load(req, res, 'products', id);
                }
                return res.status(200)
                    .json({
                    ok: true,
                    message: 'Datos actualizados correctamente'
                });
                // result = await MySQL.executeQuery(this.Query); 
            }
            catch (error) {
                return res.status(404)
                    .json({
                    ok: true,
                    error
                });
            }
        });
    }
    delete(id, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.Query = `DELETE FROM employeesxproducts WHERE products_id = '${id}'`;
                yield connection_1.default.executeQuery(this.Query);
                this.Query = `SELECT  image FROM products WHERE id = '${id}'`;
                let result = yield connection_1.default.executeQuery(this.Query);
                this.Query = `DELETE FROM products WHERE id = '${id}'`;
                yield connection_1.default.executeQuery(this.Query);
                UPLOAD.borraArchivo(result[0].image, 'products');
                return res.status(200)
                    .json({
                    ok: true,
                    message: 'Datos eliminados correctamente'
                });
            }
            catch (error) {
                return res.status(404)
                    .json({
                    ok: false,
                    error
                });
            }
        });
    }
    //Creando un carrito
    cart(id, quantity, res) {
        return __awaiter(this, void 0, void 0, function* () {
            this.Query = "SELECT `quantity` FROM `products` WHERE id='" + id + "'";
            let q = yield connection_1.default.executeQuery(this.Query);
            if (q[0].quantity < Number(quantity)) {
                return res.status(400).json({ ok: false, message: 'Sobre pasa lo que hay en el inventario' });
            }
            this.Query = "SELECT `products_id` FROM `cart` WHERE products_id='" + id + "'";
            q = yield connection_1.default.executeQuery(this.Query);
            try {
                if (q[0].constructor.name == 'RowDataPacket') {
                    this.Query = 'UPDATE `cart` SET `quantity`=' + quantity + ' WHERE products_id=' + id + '';
                    yield connection_1.default.executeQuery(this.Query);
                    return res.status(200).json({
                        ok: true,
                        message: 'Se actualizo correctamente'
                    });
                }
            }
            catch (error) {
                this.Query = 'INSERT INTO `cart`(`products_id`, `quantity`) VALUES (' + id + ',' + quantity + ')';
                yield connection_1.default.executeQuery(this.Query);
                return res.status(200).json({
                    ok: true,
                    message: 'Se creo correctamente'
                });
            }
            //OkPacket
        });
    }
    eliminateCart(id, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.Query = "SELECT `products_id` FROM `cart` WHERE products_id = '" + id + "'";
                let result = yield connection_1.default.executeQuery(this.Query);
                if (result[0].constructor.name === 'RowDataPacket') {
                    this.Query = "DELETE FROM `cart` WHERE products_id='" + id + "'";
                    result = yield connection_1.default.executeQuery(this.Query);
                    return res.status(200).json({
                        ok: true,
                        message: 'Se elimino correctamente'
                    });
                }
            }
            catch (error) {
                return res.status(404).json({
                    ok: false,
                    message: 'No se encontro el carrito'
                });
            }
        });
    }
    //Shopping
    shopping(id, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.Query = "SELECT `products_id` FROM `customersxproducts` WHERE customers_id='" + id + "'";
                var result = yield connection_1.default.executeQuery(this.Query);
                var price;
                var quantity;
                var x = [];
                var total = 0;
                for (let index = 0; index < result.length; index++) {
                    this.Query = `SELECT price FROM products WHERE id = '${result[index].products_id}'`;
                    price = yield connection_1.default.executeQuery(this.Query);
                    this.Query = "SELECT `quantity` FROM `cart` WHERE products_id = '" + result[index].products_id + "'";
                    quantity = yield connection_1.default.executeQuery(this.Query);
                    try {
                        total += Number(price[0].price * quantity[0].quantity);
                    }
                    catch (error) {
                        total += Number(price[0].price);
                    }
                }
                try {
                    this.Query = 'SELECT `price` FROM `shoppingseccion` WHERE `customer_id`=' + id + '';
                    result = yield connection_1.default.executeQuery(this.Query);
                    if (result[0].constructor.name === 'RowDataPacket') {
                        this.Query = 'UPDATE `shoppingseccion` SET `price`=' + total + ' WHERE `customer_id`=' + id + '';
                        result = yield connection_1.default.executeQuery(this.Query);
                    }
                    return res.json({ ok: true, message: 'Precio actualizado correctamente' });
                }
                catch (error) {
                    this.Query = 'INSERT INTO `shoppingseccion`(`customer_id`, `price`) VALUES (' + id + ',' + total + ')';
                    result = yield connection_1.default.executeQuery(this.Query);
                    return res.json({ ok: true, message: 'Precio ingresado correctamente' });
                }
            }
            catch (error) {
                return res.status(400).json({ ok: false, error });
            }
        });
    }
}
exports.ProductModel = ProductModel;
