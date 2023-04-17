"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const custom_api_1 = require("./custom-api");
const bad_request_1 = require("./bad-request");
const unauthenticated_1 = require("./unauthenticated");
const not_found_1 = require("./not-found");
exports.default = {
    CustomAPIError: custom_api_1.CustomAPIError,
    BadRequestError: bad_request_1.BadRequestError,
    UnauthenticatedError: unauthenticated_1.UnauthenticatedError,
    NotFoundError: not_found_1.NotFoundError,
};
