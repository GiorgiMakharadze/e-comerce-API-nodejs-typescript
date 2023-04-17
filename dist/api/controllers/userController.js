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
exports.updateUserPassword = exports.updateUser = exports.showCurrentUser = exports.getSingleUser = exports.getAllUsers = void 0;
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("get all users");
});
exports.getAllUsers = getAllUsers;
const getSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("get Signle users");
});
exports.getSingleUser = getSingleUser;
const showCurrentUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("show current users");
});
exports.showCurrentUser = showCurrentUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("update  users");
});
exports.updateUser = updateUser;
const updateUserPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("update User Password");
});
exports.updateUserPassword = updateUserPassword;
