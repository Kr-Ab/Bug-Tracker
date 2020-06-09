"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("./../../config/mongoose");
const router = require("express").Router();
const verify = require("./../auth/verifyToken");
router.get("/myAccount", verify, (req, res) => __awaiter(this, void 0, void 0, function* () {
    const objContext = {
        reqUserIdVerify: req.user._id,
        reqBodyUserId: req.body.userId
    };
    const docAdmin = yield mongoose_1.Admin.findById(objContext.reqUserIdVerify);
    try {
        if (!docAdmin) {
            const docAdmin = yield mongoose_1.Admin.findOne({
                personal: { $elemMatch: { _id: objContext.reqUserIdVerify } }
            });
            for (let i = 0; i < docAdmin.personal.length; i++) {
                if (docAdmin.personal[i]._id == objContext.reqUserIdVerify) {
                    res.send(docAdmin.personal[i]);
                    return;
                }
            }
        }
        else {
            res.send(docAdmin);
        }
    }
    catch (err) {
        res.status(400).send(err);
    }
}));
module.exports = router;
