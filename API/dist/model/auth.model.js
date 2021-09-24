"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.AuthModel = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const connection_1 = __importDefault(require("../config/connection"));
const mailer_1 = require("../config/mailer");
const key_users_1 = __importDefault(require("../config/key-users"));
class AuthModel {
    static login(data, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = data;
            this.Query = `SELECT status FROM users WHERE email = '${email}'`;
            var rows = yield connection_1.default.executeQuery(this.Query);
            if (rows[0].status === 'disabled')
                return res.status(404).json({ ok: false, message: 'User disabled!' });
            this.Query = `SELECT * FROM users WHERE email = '${email}' AND status = 'active'`;
            rows = yield connection_1.default.executeQuery(this.Query);
            if (!rows[0]) {
                return res.status(406).json({
                    ok: false,
                    message: 'Email or password invalid'
                });
            }
            this.Query = `SELECT password FROM users WHERE email = '${email}' AND status = 'active'`;
            rows = yield connection_1.default.executeQuery(this.Query);
            const pass_hash = bcrypt_1.default.compareSync(password, rows[0].password);
            if (pass_hash == false) {
                return res.status(406).json({
                    ok: false,
                    message: 'Email or password invalid'
                });
            }
            else if (pass_hash == true) {
                this.Query = `SELECT * FROM users WHERE email = '${email}' AND status = 'active'`;
                rows = yield connection_1.default.executeQuery(this.Query);
                if (rows[0].role == 'admin') {
                    const token = jwt.sign({ userId: rows[0].id, username: rows[0].name, role: rows[0].role }, key_users_1.default.jwtSecret, { expiresIn: '1h' });
                    return res.status(200).json({
                        ok: true,
                        id: rows[0].id,
                        token
                    });
                }
                else if (rows[0].role == 'client') {
                    const token = jwt.sign({ userId: rows[0].id, username: rows[0].name, role: rows[0].role }, key_users_1.default.jwtSecret);
                    return res.status(200).json({
                        ok: true,
                        id: rows[0].id,
                        token
                    });
                }
            }
        });
    }
    static register(data, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.Query = `SELECT status FROM users WHERE email = '${data.email}'`;
                var rows = yield connection_1.default.executeQuery(this.Query);
                if (rows[0]) {
                    if (rows[0].status === 'disabled') {
                        return res.status(404).json({ ok: false, message: 'User disabled!' });
                    }
                }
                if (!(yield AuthModel.valEmail(data))) {
                    return res.status(406).json({
                        ok: false,
                        message: 'Email exist!'
                    });
                }
                if (!(yield AuthModel.valTel(data))) {
                    return res.status(406).json({
                        ok: false,
                        message: 'Telephone exist!'
                    });
                }
                if (data.role) {
                    if (!(data.role == 'admin' || data.role == 'client')) {
                        return res.status(406).json({
                            ok: false,
                            message: 'Error in role!'
                        });
                    }
                }
                //Creando una dirección
                this.Query = `INSERT INTO 

            address(
            calle, 
            country, 
            state, 
            city, 
            zip) 

            VALUES (?,?,?,?,?)`;
                this.inserts = [
                    `${data.calle}`,
                    `${data.country}`,
                    `${data.state}`,
                    `${data.city}`,
                    `${data.zip}`
                ];
                this.Query = connection_1.default.instance.cnn.format(this.Query, this.inserts);
                rows = yield connection_1.default.executeQuery(this.Query);
                data.password = yield bcrypt_1.default.hash(data.password, 10);
                this.Query = `
            INSERT INTO

            users(
            name, 
            surname, 
            gender, 
            email,
            telephone, 
            password, 
            role)

            VALUES (?,?,?,?,?,?,?)`;
                var role;
                if (!data.role) {
                    role = 'client';
                    data.role = role;
                }
                else {
                    role = data.role;
                }
                this.inserts = [
                    `${data.name}`,
                    `${data.surname}`,
                    `${data.gender}`,
                    `${data.email}`,
                    `${data.telephone}`,
                    `${data.password}`,
                    `${data.role}`
                ];
                this.Query = connection_1.default.instance.cnn.format(this.Query, this.inserts);
                var result = yield connection_1.default.executeQuery(this.Query);
                if (result.constructor.name === "OkPacket") {
                    this.Query = `SELECT * FROM users WHERE email = '${data.email}'`;
                    result = yield connection_1.default.executeQuery(this.Query);
                    this.Query = `INSERT INTO address_users(users_id, address_id) VALUES ('${result[0].id}','${rows.insertId}')`;
                    yield connection_1.default.executeQuery(this.Query);
                    delete result[0].password;
                    return res.status(200).json({
                        ok: true,
                        user: {
                            role,
                            id: result[0].id,
                            status: result[0].status,
                            name: result[0].name,
                            surname: result[0].surname,
                            email: result[0].email
                        }
                    });
                }
            }
            catch (error) {
                return res.status(400).json({
                    ok: false,
                    message: 'Bad query!'
                });
            }
        });
    }
    static valEmail(data) {
        return __awaiter(this, void 0, void 0, function* () {
            this.Query = `SELECT email FROM users WHERE email= '${data.email}'`;
            let result = yield connection_1.default.executeQuery(this.Query);
            if (result[0] == undefined) {
                return true;
            }
            else if (result[0].constructor.name == 'RowDataPacket') {
                return false;
            }
        });
    }
    static valTel(data) {
        return __awaiter(this, void 0, void 0, function* () {
            this.Query = `SELECT telephone FROM users WHERE telephone= '${data.telephone}'`;
            let resultT = yield connection_1.default.executeQuery(this.Query);
            if (resultT[0] == undefined) {
                return true;
            }
            else if (resultT[0].constructor.name == 'RowDataPacket') {
                return false;
            }
        });
    }
    static changePassword(oldPass, newPass, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = res.locals.jwtPayload;
            this.Query = `SELECT password FROM users WHERE id = '${userId}'`;
            let result = yield connection_1.default.executeQuery(this.Query);
            const pass_hash = bcrypt_1.default.compareSync(oldPass, result[0].password);
            if (!pass_hash) {
                return res.status(406).json({
                    ok: false,
                    message: 'Password incorrect!'
                });
            }
            let _newPass = yield bcrypt_1.default.hash(newPass, 10);
            this.Query = `UPDATE users SET password ='${_newPass}' WHERE id='${userId}' AND status = 'active'`;
            result = yield connection_1.default.executeQuery(this.Query);
            if (result.constructor.name === 'OkPacket') {
                return res.status(200).json({
                    ok: true,
                    message: 'Success!'
                });
            }
        });
    }
    static forgortPassword(email, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const message = 'Check your email for a link to reset your password';
            let verificationLink;
            try {
                this.Query = `SELECT id,name FROM users WHERE email= '${email}' AND status = 'active'`;
                let result = yield connection_1.default.executeQuery(this.Query);
                const { id, name } = result[0];
                const token = jwt.sign({ userId: id, username: name }, key_users_1.default.jwtSecretReset, { expiresIn: '10m' });
                verificationLink = `http://localhost:4200/fegui_sajusa/api/v2/new-password/${token}`;
                this.Query = `UPDATE users SET resetToken='${token}' WHERE id='${id}'`;
            }
            catch (error) {
                return res.status(400).json({
                    ok: false,
                    message
                });
            }
            try {
                yield connection_1.default.executeQuery(this.Query);
            }
            catch (error) {
                return res.status(400).json({
                    ok: false,
                    message: 'Something goes wrong!'
                });
            }
            try {
                // send mail with defined transport object
                yield mailer_1.transporter.sendMail({
                    from: '"Team FeguiSajusa"',
                    to: email,
                    subject: `Forgort Password `,
                    html: `
                <p>Expires in 10m</p> 
                <p>Please click in link, or paste this into your browser to complete the process:  </p> 
                <a href="${verificationLink}">${verificationLink}</a>
                `
                });
            }
            catch (error) {
                return res.status(400).json({
                    ok: false,
                    message: 'Something goes wrong!'
                });
            }
            return res.status(200).json({
                ok: true,
                message
            });
        });
    }
    static createNewPassword(resetToken, newPassword, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let jwtPayload = jwt.verify(resetToken, key_users_1.default.jwtSecretReset);
                // this.Query =  `SELECT password FROM users WHERE resetToken = '${resetToken}'`;
                // var result:any = await MySQL.executeQuery(this.Query);
                let _newPassword = yield bcrypt_1.default.hash(newPassword, 10);
                this.Query = `UPDATE users SET password ='${_newPassword}' WHERE resetToken='${resetToken}' AND status = 'active'`;
                var result = yield connection_1.default.executeQuery(this.Query);
                if (result.constructor.name === 'OkPacket') {
                    return res.status(200).json({
                        ok: true,
                        message: 'Password change!'
                    });
                }
            }
            catch (error) {
                return res.status(401).json({
                    ok: false,
                    message: 'Something goes wrong!'
                });
            }
        });
    }
}
exports.AuthModel = AuthModel;
AuthModel.Query = '';
AuthModel.inserts = [''];
