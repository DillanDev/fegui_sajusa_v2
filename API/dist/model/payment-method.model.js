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
exports.PaymentMethodModel = void 0;
const connection_1 = __importDefault(require("../config/connection"));
class PaymentMethodModel {
    static createPayment(id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            let escapeID = connection_1.default.instance.cnn.escape(id);
            this.Query = `
        INSERT INTO payment (customer_id, payment_type, name, account_no, expiry) 
        VALUES (?, ?, ?, ?, ?)`;
            this.inserts = [`${escapeID}`, `${body.payment_type}`, `${body.name}`, `${body.account_no}`, `${body.expiry}`];
            this.Query = connection_1.default.instance.cnn.format(this.Query, this.inserts);
            return yield connection_1.default.executeQuery(this.Query);
        });
    }
}
exports.PaymentMethodModel = PaymentMethodModel;
PaymentMethodModel.Query = '';
PaymentMethodModel.inserts = [''];
