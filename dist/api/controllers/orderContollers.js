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
exports.updateOrder = exports.getCurrentUserOrders = exports.getSingleOrder = exports.getAllOrders = exports.createOrder = void 0;
const http_status_codes_1 = require("http-status-codes");
const Order_1 = __importDefault(require("../models/Order"));
const Product_1 = __importDefault(require("../models/Product"));
const utils_1 = require("../../utils");
const errors_1 = require("../errors");
const fakeStripeAPI = ({ amount, currency, }) => __awaiter(void 0, void 0, void 0, function* () {
    const client_secret = "someRandomValue";
    return { client_secret, amount };
});
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { items: cartItems, tax, shippingFee } = req.body;
    if (!cartItems || cartItems.length < 1) {
        throw new errors_1.BadRequestError("No cart items provided");
    }
    if (!tax || !shippingFee) {
        throw new errors_1.BadRequestError("Please provide tax and shipping fee");
    }
    let orderItems = [];
    let subtotal = 0;
    for (const item of cartItems) {
        const dbProduct = yield Product_1.default.findOne({ _id: item.product });
        if (!dbProduct) {
            throw new errors_1.BadRequestError(`No product with id: ${item.product}`);
        }
        const { name, price, image, _id } = dbProduct;
        const singleOrderItem = {
            amount: item.amount,
            name,
            price,
            image,
            product: _id,
        };
        orderItems = [...orderItems, singleOrderItem];
        subtotal += item.amount * price;
    }
    const total = tax + shippingFee + subtotal;
    const paymentIntent = yield fakeStripeAPI({
        amount: total,
        currency: "usd",
    });
    const order = yield Order_1.default.create({
        orderItems,
        total,
        subtotal,
        tax,
        shippingFee,
        clientSecret: paymentIntent.client_secret,
        user: (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId,
    });
    console.log(subtotal);
    res
        .status(http_status_codes_1.StatusCodes.CREATED)
        .json({ order, clientSecret: order.clientSecret });
});
exports.createOrder = createOrder;
const getAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield Order_1.default.find({});
    res.status(http_status_codes_1.StatusCodes.OK).json({ orders, count: orders.length });
});
exports.getAllOrders = getAllOrders;
const getSingleOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: orderId } = req.params;
    const order = yield Order_1.default.findOne({ _id: orderId });
    if (!order) {
        throw new errors_1.BadRequestError(`No order with id: ${orderId}`);
    }
    (0, utils_1.checkPremissions)(req.user, order.user);
    res.status(http_status_codes_1.StatusCodes.OK).json({ order });
});
exports.getSingleOrder = getSingleOrder;
const getCurrentUserOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const orders = yield Order_1.default.find({ user: (_b = req.user) === null || _b === void 0 ? void 0 : _b.userId });
    res.status(http_status_codes_1.StatusCodes.OK).json({ orders, count: orders.length });
});
exports.getCurrentUserOrders = getCurrentUserOrders;
const updateOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: orderId } = req.params;
    const { paymentIntentId } = req.body;
    const order = yield Order_1.default.findOne({ _id: orderId });
    if (!order) {
        throw new errors_1.BadRequestError(`No order with id: ${orderId}`);
    }
    if (order.user) {
        (0, utils_1.checkPremissions)(req.user, order.user);
    }
    order.paymentIntentId = paymentIntentId;
    order.status = "paid";
    yield order.save();
    res.status(http_status_codes_1.StatusCodes.OK).json({ order });
});
exports.updateOrder = updateOrder;
