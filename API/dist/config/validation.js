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
exports.Validation = void 0;
class Validation {
    AlonString(x, maxL, minL) {
        const regex = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/;
        let b = false;
        if (!regex.test(x) || x.length >= maxL || x.length <= minL) {
            return b = false;
        }
        else {
            return b = true;
        }
    }
    email(x, maxL, minL) {
        return __awaiter(this, void 0, void 0, function* () {
            const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            let b = false;
            if (!regex.test(x) || x.length >= maxL || x.length <= minL) {
                return b = false;
            }
            else {
                return b = true;
            }
        });
    }
    password(x, maxL, minL) {
        let b = false;
        if (x.length >= maxL || x.length <= minL) {
            return b = false;
        }
        else {
            return b = true;
        }
    }
    AlonNumber(x, maxL, minL) {
        const regex = /^[(]{0,1}[+]?[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;
        ;
        let b = false;
        if (!regex.test(x) || x.length >= maxL || x.length <= minL) {
            return b = false;
        }
        else {
            return b = true;
        }
    }
}
exports.Validation = Validation;
