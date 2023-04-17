"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.attachCookiesToResponse = exports.isTokenValid = exports.createJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const http_status_codes_1 = require("http-status-codes");
const createJWT = ({ payload, }) => {
    const token = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_LIFETIME,
    });
    return token;
};
exports.createJWT = createJWT;
const isTokenValid = ({ token }) => jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
exports.isTokenValid = isTokenValid;
const attachCookiesToResponse = ({ res, user, }) => {
    const token = (0, exports.createJWT)({ payload: user });
    const oneDay = 1000 * 60 * 60 * 24;
    res.cookie("token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + oneDay),
        secure: process.env.NODE_ENV === "production",
        signed: true,
    });
    res.status(http_status_codes_1.StatusCodes.CREATED).json({ user });
};
exports.attachCookiesToResponse = attachCookiesToResponse;
