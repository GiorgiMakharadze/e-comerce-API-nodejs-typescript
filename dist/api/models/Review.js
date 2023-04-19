"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const ReviewSchema = new mongoose_1.Schema({
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: [true, "Please provide rating"],
    },
    title: {
        type: String,
        trim: true,
        required: [true, "Please provide  review title"],
        maxlength: 100,
    },
    comment: {
        type: String,
        required: [true, "Please provide review text"],
    },
    user: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "User",
        required: true,
    },
    product: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "Product",
        required: true,
    },
}, { timestamps: true });
ReviewSchema.index({ product: 1, user: 1 }, { unique: true });
exports.default = mongoose_1.default.model("Review", ReviewSchema);
