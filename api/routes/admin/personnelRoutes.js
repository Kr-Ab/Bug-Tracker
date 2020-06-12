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
router.get("/myPersonel", verify, (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const objContext = {
            reqUserIdVerify: req.user._id
        };
        const docAdmin = yield mongoose_1.Admin.findById(objContext.reqUserIdVerify);
        res.send(docAdmin.personal);
        console.log("my list of personnel");
    }
    catch (err) {
        res.status(400).send(err);
        console.log(err);
    }
}));
router.post("/assignUserRole", verify, (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const objContext = {
            reqUserIdVerify: req.user._id,
            reqBodyUserId: req.body.userId,
            reqBodyRole: req.body.role
        };
        const docAdmin = yield mongoose_1.Admin.findById(objContext.reqUserIdVerify);
        for (let i = 0; i < docAdmin.personal.length; i++) {
            if (docAdmin.personal[i]._id == objContext.reqBodyUserId) {
                docAdmin.personal[i]["role"] = objContext.reqBodyRole;
                yield docAdmin.save();
                break;
            }
        }
        res.send(docAdmin.personal);
        console.log("successfully assigned staff ");
    }
    catch (err) {
        res.status(400).send(err);
        console.log(err);
    }
}));
router.get("/myDevs", verify, (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const objContext = {
            reqUserIdVerify: req.user._id
        };
        const docAdmin = yield mongoose_1.Admin.findById(objContext.reqUserIdVerify);
        let personelDev = [];
        for (let i = 0; i < docAdmin.personal.length; i++) {
            if (docAdmin.personal[i].role == "developer") {
                personelDev.push(docAdmin.personal[i]);
            }
        }
        res.send(personelDev);
        console.log("list of my devs ");
    }
    catch (err) {
        res.status(400).send(err);
        console.log(err);
    }
}));
router.post("/deletePersonalById", verify, (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const objContext = {
            reqUserId: req.user._id,
            personnelId: req.body.personnelId
        };
        yield mongoose_1.Admin.updateOne({ _id: objContext.reqUserId }, { $pull: { personal: { _id: objContext.personnelId } } });
        res.send("removed staff");
        console.log("staff removed");
    }
    catch (err) {
        res.status(400).send(err);
    }
}));
module.exports = router;
