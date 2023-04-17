"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundError = exports.UnauthenticatedError = exports.BadRequestError = exports.CustomAPIError = void 0;
const custom_api_1 = require("./custom-api");
Object.defineProperty(exports, "CustomAPIError", { enumerable: true, get: function () { return custom_api_1.CustomAPIError; } });
const bad_request_1 = require("./bad-request");
Object.defineProperty(exports, "BadRequestError", { enumerable: true, get: function () { return bad_request_1.BadRequestError; } });
const unauthenticated_1 = require("./unauthenticated");
Object.defineProperty(exports, "UnauthenticatedError", { enumerable: true, get: function () { return unauthenticated_1.UnauthenticatedError; } });
const not_found_1 = require("./not-found");
Object.defineProperty(exports, "NotFoundError", { enumerable: true, get: function () { return not_found_1.NotFoundError; } });
