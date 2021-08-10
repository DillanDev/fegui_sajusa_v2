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
exports.CustomerController = void 0;
const customer_model_1 = require("../model/customer.model");
const MODEL = new customer_model_1.CustomerModel;
class CustomerController {
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.status(200).json({ ok: true, customers: yield MODEL.customers() });
            }
            catch (error) {
                res.status(500).json({ message: "Error calling function" });
            }
        });
    }
    Byid(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.status(200).json({ ok: true, customer: yield MODEL.customer(req.params.id) });
            }
            catch (error) {
                res.status(500).json({ message: "Error calling function" });
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let a = yield MODEL.createCustomer(req.body);
                console.log(a);
                res.status(200).json({ ok: true, customer: a });
            }
            catch (error) {
                res.status(500).json({ message: "Error calling function" });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.status(102);
                const A = yield MODEL.updateCustomer(req.params.id, req.body);
                res.status(200).json({ ok: true, customer: A });
            }
            catch (error) {
                res.status(500).json({ message: "Error calling function" });
            }
        });
    }
    deleteByid(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield MODEL.deleteCustomer(req.params.id);
                res.status(204).json();
            }
            catch (error) {
                res.status(500).json({ msg: "Error calling function" });
            }
        });
    }
    createPayment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let a = yield MODEL.createPayment(req.params.id, req.body);
                console.log(a);
                res.status(200).json({ ok: true, payment: a });
            }
            catch (error) {
                res.status(500).json({ message: "Error calling function" });
            }
        });
    }
    ByidPayment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.status(200).json({ ok: true, payment: yield MODEL.searchPayment(req.params.id) });
            }
            catch (error) {
                res.status(500).json({ message: "Error calling function" });
            }
        });
    }
    updatePayment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.status(102);
                const A = yield MODEL.updatePayment(req.params.id, req.body);
                res.status(200).json({ ok: true, payment: A });
            }
            catch (error) {
                res.status(500).json({ message: "Error calling function" });
            }
        });
    }
    deleteByidPayment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield MODEL.deletePayment(req.params.id);
                res.status(204).json();
            }
            catch (error) {
                res.status(500).json({ msg: "Error calling function" });
            }
        });
    }
    cart(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.status(200).json({ ok: true, products: yield MODEL.cart(req.params.id, req.body.quantity) });
            }
            catch (error) {
                res.status(500).json({ message: "Error calling function" });
            }
        });
    }
    /*ORDERS*/
    orders(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield MODEL.orders(req.params.id, res);
            }
            catch (error) {
                res.status(500).json({ message: "Error calling function" });
            }
        });
    }
    order(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield MODEL.order(req.params.id, req.params.ID, res);
            }
            catch (error) {
                res.status(500).json({ message: "Error calling function" });
            }
        });
    }
    createOrders(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield MODEL.createComment(req.params.ID, req.params.id, res, req.body);
            }
            catch (error) {
                res.status(500).json({ message: "Error calling function" });
            }
        });
    }
    updateOrders(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield MODEL.updateComment(req.params.id, req.body, res);
            }
            catch (error) {
                res.status(500).json({ message: "Error calling function" });
            }
        });
    }
    deleteOrders(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield MODEL.deleteComment(req.params.ID, req.params.id, res);
            }
            catch (error) {
                res.status(500).json({ message: "Error calling function" });
            }
        });
    }
    /*COMMENTS*/
    comments(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield MODEL.comments(req.params.id, res);
            }
            catch (error) {
                res.status(500).json({ message: "Error calling function" });
            }
        });
    }
    createComment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield MODEL.createComment(req.params.ID, req.params.id, res, req.body);
            }
            catch (error) {
                res.status(500).json({ message: "Error calling function" });
            }
        });
    }
    updateComment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield MODEL.updateComment(req.params.id, req.body, res);
            }
            catch (error) {
                res.status(500).json({ message: "Error calling function" });
            }
        });
    }
    deleteComment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield MODEL.deleteComment(req.params.ID, req.params.id, res);
            }
            catch (error) {
                res.status(500).json({ message: "Error calling function" });
            }
        });
    }
}
exports.CustomerController = CustomerController;
