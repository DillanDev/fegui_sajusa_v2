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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminJWT = exports.userJWT = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const key_users_1 = __importDefault(require("../config/key-users"));
const userJWT = (req, res, next) => {
    const token = req.headers['auth'];
    let jwtPayload;
    try {
        jwtPayload = jwt.verify(token, key_users_1.default.jwtSecret);
        res.locals.jwtPayload = jwtPayload;
    }
    catch (e) {
        return res.status(401).json({
            ok: false,
            message: "Not authorized!"
        });
    }
    const { userId, username } = jwtPayload;
    const newToken = jwt.sign({ userId, username }, key_users_1.default.jwtSecret, { expiresIn: '48h' });
    res.setHeader('token', newToken);
    next();
};
exports.userJWT = userJWT;
const adminJWT = (req, res, next) => {
    // let user:any = req.user ;
    const token = req.headers['auth'];
    let jwtPayload = jwt.verify(token, key_users_1.default.jwtSecret);
    let user = jwtPayload;
    if (user.role === 'admin') {
        next();
    }
    else {
        return res.json({
            ok: false,
            message: "User not admin!"
        });
    }
};
exports.adminJWT = adminJWT;
