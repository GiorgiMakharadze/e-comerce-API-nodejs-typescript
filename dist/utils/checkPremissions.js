"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPremissions = void 0;
const errors_1 = require("../api/errors");
const checkPremissions = (requestUser, resourceUserId) => {
    if (requestUser.role === "admin")
        return;
    if (requestUser.userId === resourceUserId.toString())
        return;
    throw new errors_1.UnauthorizedError("Not authorized to access this route");
};
exports.checkPremissions = checkPremissions;
