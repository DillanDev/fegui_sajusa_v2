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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShoppingController = void 0;
const shopping_model_1 = require("../model/shopping.model");
class ShoppingController {
    cart(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield shopping_model_1.ShoppingModel.cart(req, res);
            }
            catch (error) {
                res.status(500).json({
                    ok: false,
                    message: "Error calling function"
                });
            }
        });
    }
    addCart(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield shopping_model_1.ShoppingModel.addCart(req, res);
            }
            catch (error) {
                res.status(500).json({
                    ok: false,
                    message: "Error calling function"
                });
            }
        });
    }
    updateCart(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield shopping_model_1.ShoppingModel.updateCart(req, res);
            }
            catch (error) {
                res.status(500).json({
                    ok: false,
                    message: "Error calling function"
                });
            }
        });
    }
    deleteCart(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield shopping_model_1.ShoppingModel.deleteCart(req, res);
            }
            catch (error) {
                res.status(500).json({
                    ok: false,
                    message: "Error calling function"
                });
            }
        });
    }
}
exports.ShoppingController = ShoppingController;
