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
exports.deleteReview = exports.updateReview = exports.getSingleReview = exports.getAllReviews = exports.createReview = void 0;
const createReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("create review");
});
exports.createReview = createReview;
const getAllReviews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("getAllReviews");
});
exports.getAllReviews = getAllReviews;
const getSingleReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("getSingleReview");
});
exports.getSingleReview = getSingleReview;
const updateReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("updateReview");
});
exports.updateReview = updateReview;
const deleteReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("deleteReview");
});
exports.deleteReview = deleteReview;
