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
exports.Auth = void 0;
const auth_model_1 = require("../model/auth.model");
const validation_1 = require("../config/validation");
class Auth {
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                if (!(email && password)) {
                    return res.json({ ok: false, message: 'Username and password required' });
                }
                yield auth_model_1.AuthModel.login(req.body, res);
            }
            catch (error) {
                return res.status(500).json({
                    ok: false,
                    message: 'Error internal server!'
                });
            }
        });
    }
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!(0, validation_1.createUsersValidation)(req.body)) {
                    return res.status(406).json({
                        ok: false,
                        message: 'Data invalid!'
                    });
                }
                yield auth_model_1.AuthModel.register(req.body, res);
            }
            catch (error) {
                return res.status(500).json({
                    ok: false,
                    message: 'Error internal server '
                });
            }
        });
    }
    changePassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { oldPass, newPass } = req.body;
                if (!(oldPass && newPass)) {
                    return res.status(406).json({
                        ok: false,
                        message: 'Old password and new password required!'
                    });
                }
                yield auth_model_1.AuthModel.changePassword(oldPass, newPass, res);
            }
            catch (error) {
                return res.status(500).json({
                    ok: false,
                    message: 'Error internal server '
                });
            }
        });
    }
    forgortPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = req.body;
                if (!(email)) {
                    return res.status(406).json({
                        ok: false,
                        message: 'Email is required!'
                    });
                }
                if (!(0, validation_1.forgortPasswordValidation)(email)) {
                    return res.status(406).json({
                        ok: false,
                        message: 'Data invalid!'
                    });
                }
                yield auth_model_1.AuthModel.forgortPassword(email, res);
            }
            catch (error) {
                return res.status(500).json({
                    ok: false,
                    message: 'Error internal server '
                });
            }
        });
    }
    createNewPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { newPassword } = req.body;
            const resetToken = req.headers.reset;
            try {
                if (!(newPassword && resetToken)) {
                    return res.status(406).json({
                        ok: false,
                        message: 'All the fields are required!'
                    });
                }
                yield auth_model_1.AuthModel.createNewPassword(resetToken, newPassword, res);
            }
            catch (error) {
                return res.status(500).json({
                    ok: false,
                    message: 'Error internal server '
                });
            }
        });
    }
}
exports.Auth = Auth;
