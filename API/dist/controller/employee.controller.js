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
exports.EmployeeController = void 0;
const employee_model_1 = require("../model/employee.model");
const MODEL = new employee_model_1.EmployeeModel;
class EmployeeController {
    employees(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield MODEL.employees(res);
            }
            catch (error) {
                res.status(500).json({ message: "Error calling function" });
            }
        });
    }
    Byid(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield MODEL.employee(req.params.id, res);
            }
            catch (error) {
                res.status(500).json({ message: "Error calling function" });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield MODEL.update(req.params.id, req.body, res);
            }
            catch (error) {
                res.status(500).json({ message: "Error calling function" });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield MODEL.delete(req.params.id, res);
                res.status(204).json();
            }
            catch (error) {
                res.status(500).json({ msg: "Error calling function" });
            }
        });
    }
    /*POST*/
    posts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield MODEL.posts(res);
            }
            catch (error) {
                res.status(500).json({ message: "Error calling function" });
            }
        });
    }
    post(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield MODEL.post(req.params.id, res);
            }
            catch (error) {
                res.status(500).json({ message: "Error calling function" });
            }
        });
    }
    createPost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield MODEL.createPost(req.params.id, req.body, res, req);
            }
            catch (error) {
                res.status(500).json({ message: "Error calling function" });
            }
        });
    }
    updatePost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield MODEL.updatePost(req.body, req.params.id, res, req);
            }
            catch (error) {
                res.status(500).json({ message: "Error calling function" });
            }
        });
    }
    deletePost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield MODEL.deletePost(req.params.id, res);
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
exports.EmployeeController = EmployeeController;
