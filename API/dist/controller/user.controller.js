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
exports.UserController = void 0;
const user_model_1 = require("../model/user.model");
class UserController {
    user(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield user_model_1.UserModel.user(req.params.id, res);
            }
            catch (error) {
                res.status(500).json({
                    ok: false,
                    message: "Error calling function"
                });
            }
        });
    }
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield user_model_1.UserModel.updateUser(req.params.id, req.body, res);
            }
            catch (error) {
                res.status(500).json({
                    ok: false,
                    message: "Error calling function"
                });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield user_model_1.UserModel.deleteUser(req.params.id, res);
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
exports.UserController = UserController;
