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
exports.logout = exports.login = exports.register = void 0;
const http_status_codes_1 = require("http-status-codes");
const User_1 = __importDefault(require("../models/User"));
const bad_request_1 = require("../errors/bad-request");
const utils_1 = require("../../utils");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, name, password } = req.body;
    const emailAlreadyExists = yield User_1.default.findOne({ email });
    if (emailAlreadyExists) {
        throw new bad_request_1.BadRequestError("Email already exists");
    }
    //first registered user is an admin
    const isFirstAccount = (yield User_1.default.countDocuments({})) === 0;
    const role = isFirstAccount ? "admin" : "user";
    const user = yield User_1.default.create({ name, email, password, role });
    const tokenUser = { name: user.name, userId: user._id, role: user.role };
    (0, utils_1.attachCookiesToResponse)({ res, user: tokenUser });
    res.status(http_status_codes_1.StatusCodes.CREATED).json({ user: tokenUser });
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("login");
});
exports.login = login;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("logout");
});
exports.logout = logout;
