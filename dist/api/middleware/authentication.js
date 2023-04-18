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
exports.authorizePremmisions = exports.authenticateUser = void 0;
const utils_1 = require("../../utils");
const errors_1 = require("../errors");
const authenticateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.signedCookies.token;
    if (!token) {
        throw new errors_1.UnauthenticatedError("Authentication Invalid");
    }
    try {
        const { name, userId, role } = (0, utils_1.isTokenValid)({ token });
        req.user = { name, userId, role };
        next();
    }
    catch (error) {
        throw new errors_1.UnauthenticatedError("Authentication Invalid");
    }
});
exports.authenticateUser = authenticateUser;
const authorizePremmisions = (...roles) => {
    return (req, res, next) => {
        var _a, _b;
        if (!((_a = req.user) === null || _a === void 0 ? void 0 : _a.role) || !roles.includes((_b = req.user) === null || _b === void 0 ? void 0 : _b.role)) {
            throw new errors_1.UnauthorizedError("Unauthorized to access this route");
        }
        next();
    };
};
exports.authorizePremmisions = authorizePremmisions;
// export const authorizePremmisions = (
//   req: RequestWithUser,
//   res: Response,
//   next: NextFunction
// ) => {
//   if (req.user?.role !== "admin") {
//     throw new UnauthorizedError("Unauthorized to access this route");
//   }
//   next();
// };
