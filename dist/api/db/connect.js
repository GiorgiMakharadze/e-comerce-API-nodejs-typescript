"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const connectDB = (url) => {
    return mongoose_1.default
        .connect(url)
        .then(() => console.log("Connected to MongoDb"))
        .catch((err) => console.log("Error connecting to MongoDB:", err.message));
};
exports.connectDB = connectDB;
