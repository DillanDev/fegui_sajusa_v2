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
exports.UserModel = void 0;
const connection_1 = __importDefault(require("../config/connection"));
class UserModel {
    //Para Clientes y administradores!
    static user(id, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let escapeID = connection_1.default.instance.cnn.escape(id);
                this.Query = `
            SELECT * 
            FROM users 
            WHERE id = ${escapeID} AND status = 'active'`;
                let result = yield connection_1.default.executeQuery(this.Query);
                delete result[0].password;
                delete result[0].resetToken;
                return res.status(200).json({
                    ok: true,
                    user: result[0],
                });
            }
            catch (error) {
                res.status(500).json({
                    ok: false,
                    message: 'Consult failed!'
                });
            }
        });
    }
    static updateUser(id, data, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var i = 0;
                if (data.password) {
                    return res.status(406).json({
                        ok: false,
                        message: 'Field invalid!'
                    });
                }
                let escapeID = connection_1.default.instance.cnn.escape(id);
                for (var value in data) {
                    this.inserts[i] = '';
                    this.inserts[i] += value;
                    i++;
                    this.inserts[i] = '';
                    this.inserts[i] += data[value];
                    i++;
                }
                this.Query = `UPDATE users SET ??=?`;
                for (let i = 1; i <= Object.keys(data).length - 1; i++) {
                    this.Query += ',??=?';
                }
                this.Query += ` WHERE id = ${escapeID} AND status = 'active' `;
                this.Query = connection_1.default.instance.cnn.format(this.Query, this.inserts);
                var result;
                yield connection_1.default.executeQuery(this.Query).then(() => {
                    if (data.password)
                        delete data.password;
                    result = data;
                });
                return res.status(200).json({
                    ok: true,
                    message: 'Success full!'
                });
            }
            catch (error) {
                return res.status(500).json({
                    ok: false,
                    message: 'Consult failed!'
                });
            }
        });
    }
    static deleteUser(id, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let escapeID = connection_1.default.instance.cnn.escape(id);
            this.Query = `
        UPDATE users 
        SET status='disabled' 
        WHERE id = ${escapeID}`;
            try {
                let rows = yield connection_1.default.executeQuery(this.Query);
                if (rows.constructor.name === "OkPacket") {
                    return res.status(200).json({
                        ok: true,
                        message: 'User delete success!'
                    });
                }
            }
            catch (error) {
                return res.status(406).json({
                    ok: false,
                    message: 'Delete Failed!'
                });
            }
        });
    }
}
exports.UserModel = UserModel;
UserModel.Query = '';
UserModel.inserts = [''];
