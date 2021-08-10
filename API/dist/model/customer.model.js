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
exports.CustomerModel = void 0;
const connection_1 = __importDefault(require("../config/connection"));
const bcrypt_1 = __importDefault(require("bcrypt"));
class CustomerModel {
    constructor() {
        this.Query = '';
        this.inserts = [''];
    }
    customers() {
        return __awaiter(this, void 0, void 0, function* () {
            this.Query = `
       SELECT * 
       FROM customers`;
            return yield connection_1.default.executeQuery(this.Query);
        });
    }
    customer(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let escapeID = connection_1.default.instance.cnn.escape(id);
                this.Query = `
            SELECT * 
            FROM customers 
            WHERE id = ${escapeID} AND status = 'actived'`;
                let result = yield connection_1.default.executeQuery(this.Query);
                delete result[0].password;
                return result[0];
            }
            catch (error) {
                console.log('Id invalid');
            }
        });
    }
    createCustomer(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("entro");
                body.password = yield bcrypt_1.default.hash(body.password, 10);
                this.Query = `
            INSERT INTO 
            customers(name, surname,image, gender, email,telephone, password, city, region, zip) 
            VALUES (?,?,?,?,?,?,?,?,?,?)`;
                this.inserts = [`${body.name}`, `${body.surname}`, `${body.image}`, `${body.gender}`, `${body.email}`, `${body.telephone}`, `${body.password}`, `${body.city}`, `${body.city}`, `${body.region}`];
                this.Query = connection_1.default.instance.cnn.format(this.Query, this.inserts);
                var result;
                yield connection_1.default.executeQuery(this.Query).then(() => {
                    delete body.password;
                    result = body;
                });
                return result;
            }
            catch (error) {
                console.log('Query failed');
            }
        });
    }
    updateCustomer(id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var i = 0;
                let escapeID = connection_1.default.instance.cnn.escape(id);
                for (var value in body) {
                    this.inserts[i] = '';
                    this.inserts[i] += value;
                    i++;
                    this.inserts[i] = '';
                    this.inserts[i] += body[value];
                    i++;
                }
                this.Query = `UPDATE customers SET ??=?`;
                for (let i = 1; i <= Object.keys(body).length - 1; i++) {
                    this.Query += ',??=?';
                }
                this.Query += ` WHERE id = ${escapeID} AND status = 'active' `;
                this.Query = connection_1.default.instance.cnn.format(this.Query, this.inserts);
                var result;
                yield connection_1.default.executeQuery(this.Query).then(() => {
                    if (body.password)
                        delete body.password;
                    result = body;
                });
                return result;
            }
            catch (error) {
                console.log('Query failed');
            }
        });
    }
    deleteCustomer(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let escapeID = connection_1.default.instance.cnn.escape(id);
            this.Query = `
        UPDATE customers 
        SET status='disabled' 
        WHERE id = ${escapeID}`;
            return yield connection_1.default.executeQuery(this.Query);
        });
    }
    createPayment(id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            let escapeID = connection_1.default.instance.cnn.escape(id);
            this.Query = `
        INSERT INTO payment (customer_id, payment_type, name, account_no, expiry) 
        VALUES (?, ?, ?, ?, ?)`;
            this.inserts = [`${escapeID}`, `${body.payment_type}`, `${body.name}`, `${body.account_no}`, `${body.expiry}`];
            this.Query = connection_1.default.instance.cnn.format(this.Query, this.inserts);
            return yield connection_1.default.executeQuery(this.Query);
        });
    }
    searchPayment(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let escapeID = connection_1.default.instance.cnn.escape(id);
                this.Query = `
            SELECT * 
            FROM payment 
            WHERE customer_id = ${escapeID}`;
                let result = yield connection_1.default.executeQuery(this.Query);
                return result[0];
            }
            catch (error) {
                console.log('Id invalid');
            }
        });
    }
    updatePayment(id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var i = 0;
                let escapeID = connection_1.default.instance.cnn.escape(id);
                for (var value in body) {
                    this.inserts[i] = '';
                    this.inserts[i] += value;
                    i++;
                    this.inserts[i] = '';
                    this.inserts[i] += body[value];
                    i++;
                }
                this.Query = `UPDATE payment SET ??=?`;
                for (let i = 1; i <= Object.keys(body).length - 1; i++) {
                    this.Query += ',??=?';
                }
                this.Query += ` WHERE id = ${escapeID} `;
                this.Query = connection_1.default.instance.cnn.format(this.Query, this.inserts);
                var result;
                yield connection_1.default.executeQuery(this.Query).then(() => {
                    result = body;
                });
                return result;
            }
            catch (error) {
                console.log('Query failed');
            }
        });
    }
    deletePayment(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let escapeID = connection_1.default.instance.cnn.escape(id);
            this.Query = `
        DELETE FROM payment
        WHERE id = ${escapeID}`;
            return yield connection_1.default.executeQuery(this.Query);
        });
    }
    cart(id, quantity) {
        return __awaiter(this, void 0, void 0, function* () {
            this.Query = `
        INSERT INTO cart(products_id, quantity) 
        VALUES ('${id}','${quantity}')`;
            return yield connection_1.default.executeQuery(this.Query);
        });
    }
    /*Orders*/
    orders(id, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.Query = 'SELECT * FROM `orders` WHERE customer_id=' + id + '';
                let result = yield connection_1.default.executeQuery(this.Query);
                return res.status(200).json({ ok: true, orders: result });
            }
            catch (error) {
                return res.status(404).json({ ok: false, error });
            }
        });
    }
    order(id, ID, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.Query = 'SELECT * FROM `orders` WHERE customer_id=' + ID + ' AND id=' + id + ';';
                let result = yield connection_1.default.executeQuery(this.Query);
                return res.status(200).json({ ok: true, orders: result[0] });
            }
            catch (error) {
                return res.status(404).json({ ok: false, error });
            }
        });
    }
    createOrders(ID, id, res, body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.Query = 'SELECT name FROM customers WHERE id=' + ID + '';
                let result = yield connection_1.default.executeQuery(this.Query);
                this.Query = 'INSERT INTO comments(post_id, author, content) VALUES (' + id + ',"' + result[0].name + '","' + body.content + '")';
                yield connection_1.default.executeQuery(this.Query);
                this.Query = 'SELECT id, author, content, createdAt, updateAt FROM comments WHERE post_id=' + id + '';
                result = yield connection_1.default.executeQuery(this.Query);
                this.Query = 'UPDATE post SET comment_count=' + (result.length) + ' WHERE id=' + id + '';
                yield connection_1.default.executeQuery(this.Query);
                return res.status(200).json({ ok: true, message: 'Actualizado correctamente' });
            }
            catch (error) {
                return res.status(404).json({ ok: false, error });
            }
        });
    }
    updateOrders(id, body, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var i = 0;
                let escapeID = connection_1.default.instance.cnn.escape(id);
                for (var value in body) {
                    this.inserts[i] = '';
                    this.inserts[i] += value;
                    i++;
                    this.inserts[i] = '';
                    this.inserts[i] += body[value];
                    i++;
                }
                this.Query = `UPDATE comments SET id=${escapeID}`;
                for (let i = 1; i <= Object.keys(body).length; i++) {
                    this.Query += ',??=?';
                }
                this.Query += ` WHERE id = ${escapeID}`;
                this.Query = connection_1.default.instance.cnn.format(this.Query, this.inserts);
                let result = yield connection_1.default.executeQuery(this.Query);
                if (result.constructor.name === 'OkPacket') {
                    return res.status(200).json({ ok: true, message: 'Se actualizo correctamente' });
                }
            }
            catch (error) {
                return res.status(404).json({ ok: false, error });
            }
        });
    }
    deleteOrders(ID, id, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.Query = 'SELECT id, author, content, createdAt, updateAt FROM comments WHERE post_id=' + ID + '';
                let result = yield connection_1.default.executeQuery(this.Query);
                this.Query = 'UPDATE post SET comment_count=' + (result.length - 1) + ' WHERE id=' + ID + '';
                yield connection_1.default.executeQuery(this.Query);
                this.Query = 'DELETE FROM comments WHERE id=' + id + '';
                yield connection_1.default.executeQuery(this.Query);
                return res.status(200).json({ ok: true, message: 'Eliminado correctamente' });
            }
            catch (error) {
                return res.status(404).json({ ok: false, error });
            }
        });
    }
    /*Comentarios*/
    comments(id, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.Query = 'SELECT id, author, content, createdAt, updateAt FROM comments WHERE post_id=' + id + '';
                let result = yield connection_1.default.executeQuery(this.Query);
                return res.status(200).json({ ok: true, comments: result });
            }
            catch (error) {
                return res.status(404).json({ ok: false, error });
            }
        });
    }
    createComment(ID, id, res, body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.Query = 'SELECT name FROM customers WHERE id=' + ID + '';
                let result = yield connection_1.default.executeQuery(this.Query);
                this.Query = 'INSERT INTO comments(post_id, author, content) VALUES (' + id + ',"' + result[0].name + '","' + body.content + '")';
                yield connection_1.default.executeQuery(this.Query);
                this.Query = 'SELECT id, author, content, createdAt, updateAt FROM comments WHERE post_id=' + id + '';
                result = yield connection_1.default.executeQuery(this.Query);
                this.Query = 'UPDATE post SET comment_count=' + (result.length) + ' WHERE id=' + id + '';
                yield connection_1.default.executeQuery(this.Query);
                return res.status(200).json({ ok: true, message: 'Actualizado correctamente' });
            }
            catch (error) {
                return res.status(404).json({ ok: false, error });
            }
        });
    }
    updateComment(id, body, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var i = 0;
                let escapeID = connection_1.default.instance.cnn.escape(id);
                for (var value in body) {
                    this.inserts[i] = '';
                    this.inserts[i] += value;
                    i++;
                    this.inserts[i] = '';
                    this.inserts[i] += body[value];
                    i++;
                }
                this.Query = `UPDATE comments SET id=${escapeID}`;
                for (let i = 1; i <= Object.keys(body).length; i++) {
                    this.Query += ',??=?';
                }
                this.Query += ` WHERE id = ${escapeID}`;
                this.Query = connection_1.default.instance.cnn.format(this.Query, this.inserts);
                let result = yield connection_1.default.executeQuery(this.Query);
                if (result.constructor.name === 'OkPacket') {
                    return res.status(200).json({ ok: true, message: 'Se actualizo correctamente' });
                }
            }
            catch (error) {
                return res.status(404).json({ ok: false, error });
            }
        });
    }
    deleteComment(ID, id, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.Query = 'SELECT id, author, content, createdAt, updateAt FROM comments WHERE post_id=' + ID + '';
                let result = yield connection_1.default.executeQuery(this.Query);
                this.Query = 'UPDATE post SET comment_count=' + (result.length - 1) + ' WHERE id=' + ID + '';
                yield connection_1.default.executeQuery(this.Query);
                this.Query = 'DELETE FROM comments WHERE id=' + id + '';
                yield connection_1.default.executeQuery(this.Query);
                return res.status(200).json({ ok: true, message: 'Eliminado correctamente' });
            }
            catch (error) {
                return res.status(404).json({ ok: false, error });
            }
        });
    }
}
exports.CustomerModel = CustomerModel;
