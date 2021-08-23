"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.forgortPasswordValidation = exports.createUsersValidation = void 0;
function createUsersValidation(data) {
    const { name, surname, email, password, gender, telephone } = data;
    const string = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/;
    const emailV = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const telephoneV = /^[(]{0,1}[+]?[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;
    if (!string.test(name) || name.length >= 30 || name.length <= 2) {
        return false;
    }
    if (!string.test(surname) || surname.length >= 60 || surname.length <= 2) {
        return false;
    }
    if (!emailV.test(email) || email.length >= 60 || email.length <= 5) {
        return false;
    }
    if (!string.test(gender) || gender.length >= 15 || gender.length <= 2) {
        return false;
    }
    if (password.length >= 60 || password.length <= 5) {
        return false;
    }
    if (!telephoneV.test(telephone) || telephone.length >= 15 || telephone.length <= 4) {
        return false;
    }
    return true;
}
exports.createUsersValidation = createUsersValidation;
function forgortPasswordValidation(email) {
    const emailV = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailV.test(email) || email.length >= 60 || email.length <= 5) {
        return false;
    }
    return true;
}
exports.forgortPasswordValidation = forgortPasswordValidation;
