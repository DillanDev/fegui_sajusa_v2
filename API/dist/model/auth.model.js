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
const connection_1 = __importDefault(require("../config/connection"));
const jwt = __importStar(require("jsonwebtoken"));
const key_customer_1 = __importDefault(require("../config/key-customer"));
const key_admin_1 = __importDefault(require("../config/key-admin"));
const bcrypt_1 = __importDefault(require("bcrypt"));
class AuthModel {
    constructor() {
        this.Query = '';
        this.inserts = [''];
    }
    login(email, password, name) {
        return __awaiter(this, void 0, void 0, function* () {
            var b = false;
            let SQL = `SELECT password FROM ${name} WHERE email = '${email}'`;
            let rows = yield connection_1.default.executeQuery(SQL);
            const pass_hash = bcrypt_1.default.compareSync(password, rows[0].password);
            if (pass_hash == false) {
                return b;
            }
            else if (pass_hash == true) {
                SQL = `SELECT * FROM ${name} WHERE email = '${email}'`;
                const rows2 = yield connection_1.default.executeQuery(SQL);
                if (name == 'employees') {
                    const token = jwt.sign({ userId: rows2[0].id, username: rows2[0].name }, key_admin_1.default.jwtSecret, { expiresIn: '1h' });
                    b = true;
                    return { b, token };
                }
                else if (name == 'customers') {
                    const token = jwt.sign({ userId: rows2[0].id, username: rows2[0].name }, key_customer_1.default.jwtSecret);
                    b = true;
                    return { b, token };
                }
            }
        });
    }
    customer(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                body.password = yield bcrypt_1.default.hash(body.password, 10);
                this.Query = `
            INSERT INTO
            customers(name, surname, gender, email,telephone, password, city, region, zip)
            VALUES (?,?,?,?,?,?,?,?,?)`;
                this.inserts = [`${body.name}`, `${body.surname}`, `${body.gender}`, `${body.email}`, `${body.telephone}`, `${body.password}`, `${body.city}`, `${body.city}`, `${body.region}`];
                this.Query = connection_1.default.instance.cnn.format(this.Query, this.inserts);
                let result = yield connection_1.default.executeQuery(this.Query);
                if (result.constructor.name === "OkPacket")
                    return true;
            }
            catch (error) {
                console.log('Query failed');
            }
        });
    }
    employee(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                body.password = yield bcrypt_1.default.hash(body.password, 10);
                this.Query = `
            INSERT INTO
            employees(name, surname, gender, email,telephone, password, role, city, region, zip)
            VALUES (?,?,?,?,?,?,?,?,?,?)`;
                this.inserts = [`${body.name}`, `${body.surname}`, `${body.gender}`, `${body.email}`, `${body.telephone}`, `${body.password}`, `${body.role}`, `${body.city}`, `${body.city}`, `${body.region}`];
                this.Query = connection_1.default.instance.cnn.format(this.Query, this.inserts);
                let result = yield connection_1.default.executeQuery(this.Query);
                if (result.constructor.name === "OkPacket")
                    return true;
            }
            catch (error) {
                console.log('Query failed');
            }
        });
    }
    valEmail(body, name) {
        return __awaiter(this, void 0, void 0, function* () {
            //Validando si existe el gmail
            this.Query = `SELECT email FROM ${name} WHERE email= '${body.email}'`;
            let result = yield connection_1.default.executeQuery(this.Query);
            if (result[0] == undefined) {
                return 'No existe el email';
            }
            else if (result[0].constructor.name == 'RowDataPacket') {
                console.log(result[0].constructor.name);
                return 'Ya existe el email';
            }
        });
    }
    valTel(body, name) {
        return __awaiter(this, void 0, void 0, function* () {
            //Validando si existe el celular
            this.Query = `SELECT telephone FROM ${name} WHERE telephone= '${body.telephone}'`;
            let resultT = yield connection_1.default.executeQuery(this.Query);
            if (resultT[0] == undefined) {
                return 'No existe el celular';
            }
            else if (resultT[0].constructor.name == 'RowDataPacket') {
                return 'Ya existe el celular';
            }
        });
    }
}
exports.AuthModel = AuthModel;
