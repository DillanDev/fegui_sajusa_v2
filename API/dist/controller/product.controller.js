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
class ProductController {
    allCategories(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield product_model_1.ProductModel.allCategories(res);
            }
            catch (error) {
                return res.status(500).json({
                    ok: false,
                    message: "Error calling function!"
                });
            }
        });
    }
    category(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield product_model_1.ProductModel.category(req, res);
            }
            catch (error) {
                return res.status(500).json({
                    ok: false,
                    message: "Error calling function!"
                });
            }
        });
    }
    searchShort(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield product_model_1.ProductModel.searchShort(req.params.name, res);
            }
            catch (error) {
                return res.status(500).json({
                    ok: false,
                    message: "Error calling function!"
                });
            }
        });
    }
    search(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield product_model_1.ProductModel.search(req, res);
            }
            catch (error) {
                return res.status(500).json({
                    ok: false,
                    message: "Error calling function!"
                });
            }
        });
    }
    Byid(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield product_model_1.ProductModel.Byid(req.params.id, res);
            }
            catch (error) {
                return res.status(500).json({
                    ok: false,
                    message: "Error calling function!"
                });
            }
        });
    }
    productSlider(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield product_model_1.ProductModel.productSlider(req.params.id, res);
            }
            catch (error) {
                return res.status(500).json({
                    ok: false,
                    message: "Error calling function!"
                });
            }
        });
    }
    //===================
    //       ADMIN      |
    //===================
    createCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield product_model_1.ProductModel.createCategory(req, res);
            }
            catch (error) {
                return res.status(500).json({
                    ok: false,
                    message: "Error calling function!"
                });
            }
        });
    }
    updateCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield product_model_1.ProductModel.updateCategory(req, res);
            }
            catch (error) {
                return res.status(500).json({
                    ok: false,
                    message: "Error calling function!"
                });
            }
        });
    }
    deleteCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield product_model_1.ProductModel.deleteCategory(req, res);
            }
            catch (error) {
                return res.status(500).json({
                    ok: false,
                    message: "Error calling function!"
                });
            }
        });
    }
    createProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield product_model_1.ProductModel.createProduct(req, res);
            }
            catch (error) {
                res.status(500).json({
                    ok: false,
                    message: "Error calling function!"
                });
            }
        });
    }
    updateProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield product_model_1.ProductModel.updateProduct(res, req);
            }
            catch (error) {
                res.status(500).json({
                    ok: false,
                    message: "Error calling function!"
                });
            }
        });
    }
    deleteProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield product_model_1.ProductModel.deleteProduct(req.params.id, res);
            }
            catch (error) {
                res.status(500).json({ message: "Error calling function" });
            }
        });
    }
}
exports.ProductController = ProductController;
