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
exports.EmployeeModel = void 0;
const connection_1 = __importDefault(require("../config/connection"));
const upload_controller_1 = require("../controller/upload.controller");
const upload_model_1 = require("./upload.model");
const MODEL = new upload_controller_1.UploadController;
const UPLOAD = new upload_model_1.UploadModel;
class EmployeeModel {
    constructor() {
        this.Query = '';
        this.inserts = [''];
    }
    employees(res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.Query = `SELECT * FROM employees WHERE status='actived'`;
                let result = yield connection_1.default.executeQuery(this.Query);
                let obj = [];
                let i = 0;
                for (var value of result) {
                    delete value.password;
                    obj[i] = value;
                    i++;
                }
                return res.status(200).json({ ok: true, employees: obj });
            }
            catch (error) {
                return res.status(404).json({ ok: false, error });
            }
        });
    }
    employee(id, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.Query = `SELECT * FROM employees WHERE id='${id}' AND status = 'actived';`;
                let result = yield connection_1.default.executeQuery(this.Query);
                delete result[0].password;
                return res.status(200).json({ ok: true, employee: result[0] });
            }
            catch (error) {
                return res.status(404).json({ ok: false, error });
            }
        });
    }
    update(id, body, res) {
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
                this.Query = `UPDATE employees SET ??=?`;
                for (let i = 1; i <= Object.keys(body).length - 1; i++) {
                    this.Query += ',??=?';
                }
                this.Query += ` WHERE id = ${escapeID} AND status = 'actived' `;
                this.Query = connection_1.default.instance.cnn.format(this.Query, this.inserts);
                var result;
                yield connection_1.default.executeQuery(this.Query).then(() => {
                    if (body.password)
                        delete body.password;
                    result = body;
                });
                return res.status(200).json({ ok: true, employee: result });
            }
            catch (error) {
                return res.status(404).json({ ok: false, error });
            }
        });
    }
    delete(id, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let escapeID = connection_1.default.instance.cnn.escape(id);
                this.Query = `
            UPDATE employees 
            SET status='disabled' 
            WHERE id = ${escapeID}`;
                let result = yield connection_1.default.executeQuery(this.Query);
                if (result.constructor.name === 'OkPacket') {
                    return res.status(200).json({ ok: true });
                }
            }
            catch (error) {
                return res.status(404).json({ ok: false, error });
            }
        });
    }
    /*POST*/
    //public post
    posts(res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.Query = 'SELECT `id`, `employees_id`, `image`, `title`, `shortDesc`, `comment_count`, `like_count`, `createdAt`, `updateAt` FROM `post` ';
                let result = yield connection_1.default.executeQuery(this.Query);
                let obj = [];
                let i = 0;
                for (var value of result) {
                    delete value.password;
                    obj[i] = value;
                    i++;
                }
                return res.status(200).json({ ok: true, posts: obj });
            }
            catch (error) {
                return res.status(404).json({ ok: false, error });
            }
        });
    }
    post(id, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.Query = 'SELECT `id`, `employees_id`, `image`, `title`, `content`, `comment_count`, `like_count`, `createdAt`, `updateAt` FROM `post` WHERE id=' + id + '';
                let result = yield connection_1.default.executeQuery(this.Query);
                delete result[0].password;
                return res.status(200).json({ ok: true, post: result[0] });
            }
            catch (error) {
                return res.status(404).json({ ok: false, error });
            }
        });
    }
    //para los admins
    createPost(ID, body, res, req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.Query = `
            INSERT INTO 
            post(employees_id, title, shortDesc, content) 
            VALUES (?,?,?,?)`;
                this.inserts = [`${ID}`, `${body.title}`, `${body.shortDesc}`, `${body.content}`];
                this.Query = connection_1.default.instance.cnn.format(this.Query, this.inserts);
                let result = yield connection_1.default.executeQuery(this.Query);
                this.Query = "SELECT * FROM `post` WHERE employees_id = '" + ID + "'";
                result = yield connection_1.default.executeQuery(this.Query);
                if (req.files !== null) {
                    yield MODEL.load(req, res, 'post', result[result.length - 1].id);
                }
                return res.status(200)
                    .json({
                    ok: true,
                    message: 'Datos guardados correctamente'
                });
            }
            catch (error) {
                return res.status(404).json({ ok: false, error });
            }
        });
    }
    updatePost(body, id, res, req) {
        return __awaiter(this, void 0, void 0, function* () {
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
                this.Query = `UPDATE post SET id=${id}`;
                for (let i = 1; i <= Object.keys(body).length; i++) {
                    this.Query += ',??=?';
                }
                this.Query += ` WHERE id = ${id}`;
                this.Query = connection_1.default.instance.cnn.format(this.Query, this.inserts);
                yield connection_1.default.executeQuery(this.Query);
                if (req.files !== null) {
                    yield MODEL.load(req, res, 'post', id);
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
    deletePost(id, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.Query = `SELECT  image FROM post WHERE id = '${id}'`;
                let result = yield connection_1.default.executeQuery(this.Query);
                this.Query = `DELETE FROM post WHERE id = '${id}'`;
                yield connection_1.default.executeQuery(this.Query);
                UPLOAD.borraArchivo(result[0].image, 'post');
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
                this.Query = 'SELECT name FROM employees WHERE id=' + ID + '';
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
exports.EmployeeModel = EmployeeModel;
