"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImage = exports.deleteProduct = exports.updateProduct = exports.getSingleProduct = exports.getAllProducts = exports.createProduct = void 0;
const createProduct = (req, res) => {
    res.send("create product");
};
exports.createProduct = createProduct;
const getAllProducts = (req, res) => {
    res.send("get all products");
};
exports.getAllProducts = getAllProducts;
const getSingleProduct = (req, res) => {
    res.send("get single product");
};
exports.getSingleProduct = getSingleProduct;
const updateProduct = (req, res) => {
    res.send("update product");
};
exports.updateProduct = updateProduct;
const deleteProduct = (req, res) => {
    res.send("delete product");
};
exports.deleteProduct = deleteProduct;
const uploadImage = (req, res) => {
    res.send("upload product");
};
exports.uploadImage = uploadImage;
