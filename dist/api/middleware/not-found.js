"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFound = void 0;
const notFound = (req, res) => res.status(404).send("<h1>Route does not exist</h1>");
exports.notFound = notFound;
