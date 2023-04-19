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
exports.uploadImage = exports.deleteProduct = exports.updateProduct = exports.getSingleProduct = exports.getAllProducts = exports.createProduct = void 0;
const path_1 = __importDefault(require("path"));
const http_status_codes_1 = require("http-status-codes");
const Product_1 = __importDefault(require("../models/Product"));
const errors_1 = require("../errors");
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    req.body.user = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    const product = yield Product_1.default.create(req.body);
    res.status(http_status_codes_1.StatusCodes.CREATED).json({ product });
});
exports.createProduct = createProduct;
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield Product_1.default.find({});
    res.status(http_status_codes_1.StatusCodes.OK).json({ products, count: products.length });
});
exports.getAllProducts = getAllProducts;
const getSingleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: productId } = req.params;
    const product = yield Product_1.default.findOne({ _id: productId }).populate("reviews");
    if (!product) {
        throw new errors_1.NotFoundError(`No product with id: ${productId}`);
    }
    res.status(http_status_codes_1.StatusCodes.OK).json({ product });
});
exports.getSingleProduct = getSingleProduct;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: productId } = req.params;
    const product = yield Product_1.default.findOneAndUpdate({ _id: productId }, req.body, {
        new: true,
        runValidators: true,
    });
    if (!product) {
        throw new errors_1.NotFoundError(`No product with id: ${productId}`);
    }
    res.status(http_status_codes_1.StatusCodes.OK).json({ product });
});
exports.updateProduct = updateProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: productId } = req.params;
    const product = yield Product_1.default.findOne({ _id: productId });
    if (!product) {
        throw new errors_1.NotFoundError(`No product with id: ${productId}`);
    }
    yield product.remove();
    res.status(http_status_codes_1.StatusCodes.OK).json({ msg: " Product Removed" });
});
exports.deleteProduct = deleteProduct;
const uploadImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    if (!req.files) {
        throw new errors_1.BadRequestError("No File Uploaded");
    }
    const productImage = (_b = req.files) === null || _b === void 0 ? void 0 : _b.image;
    if (!productImage.mimetype.startsWith("image")) {
        throw new errors_1.BadRequestError("Please Upload Image");
    }
    const maxSize = parseInt(process.env.IMAGE_MAX_SIZE);
    if (productImage.size > maxSize) {
        throw new errors_1.BadRequestError(`Please Upload Image smaller then ${maxSize} KB`);
    }
    const imagePath = path_1.default.join(__dirname, "../../../public/uploads/." + `${productImage.name}`);
    yield productImage.mv(imagePath);
    res.status(http_status_codes_1.StatusCodes.OK).json({ image: `/uploads/${productImage.name}` });
});
exports.uploadImage = uploadImage;
