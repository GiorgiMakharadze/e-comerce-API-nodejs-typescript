"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = exports.register = void 0;
const register = (req, res) => {
    res.send("register");
};
exports.register = register;
const login = (req, res) => {
    res.send("login");
};
exports.login = login;
const logout = (req, res) => {
    res.send("logout");
};
exports.logout = logout;
