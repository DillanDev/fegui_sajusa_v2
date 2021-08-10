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
exports.ProductController = void 0;
const product_model_1 = require("../model/product.model");
const MODEL = new product_model_1.ProductModel;
class ProductController {
    categories(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.status(200).json({ ok: true, categories: yield MODEL.categories() });
            }
            catch (error) {
                res.status(500).json({ message: "Error calling function" });
            }
        });
    }
    products(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield MODEL.products(req.params.name, res);
            }
            catch (error) {
                res.status(500).json({ message: "Error calling function" });
            }
        });
    }
    Byid(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield MODEL.Byid(req.params.name, res);
            }
            catch (error) {
                res.status(500).json({ message: "Error calling function" });
            }
        });
    }
    listEmployee(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield MODEL.productsEmployee(req.params.id, res);
            }
            catch (error) {
                res.status(500).json({ message: "Error calling function" });
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield MODEL.create(req.params.id, req.params.name, req.body, res, req);
            }
            catch (error) {
                res.status(500).json({ message: "Error calling function" });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield MODEL.update(req.body, req.params.id, req.params.name, res, req);
            }
            catch (error) {
                res.status(500).json({ message: "Error calling function" });
            }
        });
    }
    deleteByid(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield MODEL.delete(req.params.id, res);
            }
            catch (error) {
                res.status(500).json({ message: "Error calling function" });
            }
        });
    }
    /*Carrito*/
    //Creando
    cart(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield MODEL.cart(req.params.id, req.body.quantity, res);
            }
            catch (error) {
                res.status(500).json({ message: "Error calling function" });
            }
        });
    }
    //Eliminando
    eliminateCart(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield MODEL.eliminateCart(req.params.id, res);
            }
            catch (error) {
                res.status(500).json({ message: "Error calling function" });
            }
        });
    }
    /*Shopping*/
    //Mostrando
    shopping(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield MODEL.shopping(req.params.id, res);
            }
            catch (error) {
                res.status(500).json({ message: "Error calling function" });
            }
        });
    }
}
exports.ProductController = ProductController;
