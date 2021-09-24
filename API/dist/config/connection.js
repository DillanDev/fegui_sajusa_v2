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
const mysql_1 = __importDefault(require("mysql"));
const util_1 = __importDefault(require("util"));
const dotenv_1 = require("dotenv");
class MySQL {
    constructor() {
        this.connect = false;
        (0, dotenv_1.config)();
        this.cnn = mysql_1.default.createConnection({
            host: process.env.DATABASE_HOST || 'localhost',
            user: process.env.DATABASE_USER || 'root',
            password: process.env.DATABASE_PASSWORD || '',
            database: process.env.DATABASE_NAME || 'fegui_sajusa'
        });
        this.connectDB();
    }
    static get instance() {
        return this._instance || (this._instance = new this());
    }
    static executeQuery(query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const QUERY = util_1.default.promisify(this.instance.cnn.query).bind(this.instance.cnn);
                let rows = yield QUERY(query);
                return rows;
            }
            catch (error) {
                console.log('Error in consult: ' + error);
            }
        });
    }
    connectDB() {
        this.cnn.connect((err) => {
            if (err)
                return console.log(err.message);
            this.connect = true;
            console.log('Database online!');
        });
    }
}
exports.default = MySQL;
