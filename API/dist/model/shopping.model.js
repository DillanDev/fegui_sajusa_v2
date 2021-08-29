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
exports.ShoppingModel = void 0;
const connection_1 = __importDefault(require("../config/connection"));
class ShoppingModel {
    static cart(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.Query = `SELECT * FROM cart WHERE users_id='${req.params.id}'`;
                this.result = yield connection_1.default.executeQuery(this.Query);
                return res.status(200).json({
                    ok: true,
                    cart: this.result
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
    static addCart(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.Query = `INSERT INTO cart(users_id, products_id, quantity) VALUES ('${req.params.ID}','${req.params.id}','${req.body.quantity}')`;
                this.result = yield connection_1.default.executeQuery(this.Query);
                return res.status(200).json({
                    ok: true,
                    user_id: req.params.ID,
                    product_id: req.params.id,
                    cart_id: this.result.insertId,
                    quantity: req.body.quantity
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
    static updateCart(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.Query = `UPDATE cart SET quantity ='${req.body.quantity}' WHERE id = '${req.params.id}' AND users_id='${req.params.ID}' `;
                this.result = yield connection_1.default.executeQuery(this.Query);
                return res.status(200).json({
                    ok: true,
                    message: 'Success!'
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
    static deleteCart(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.Query = `DELETE FROM cart WHERE  users_id='${req.params.ID}' AND id='${req.params.id}' `;
                this.result = yield connection_1.default.executeQuery(this.Query);
                return res.status(200).json({
                    ok: true,
                    message: 'Success!'
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
}
exports.ShoppingModel = ShoppingModel;
ShoppingModel.Query = '';
ShoppingModel.inserts = [''];
ShoppingModel.result = '';
