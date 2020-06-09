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
const validation_1 = require("../../validation/validation");
const router = require("express").Router();
const verify = require("./../auth/verifyToken");
var bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
router.get("/getListOfTickets", verify, (req, res) => __awaiter(this, void 0, void 0, function* () {
    const objContext = {
        reqUserIdVerify: req.user._id
    };
    const docAdmin = yield mongoose_1.Admin.findById(objContext.reqUserIdVerify);
    try {
        let arrayTickets = [];
        for (let i = 0; i < docAdmin.projects.length; i++) {
            for (let j = 0; j < docAdmin.projects[i].tickets.length; j++) {
                arrayTickets.push(docAdmin.projects[i].tickets[j]);
            }
        }
        res.send(arrayTickets);
        console.log("list of tickets sent to frontend");
    }
    catch (err) {
        res.status(400).send(err);
    }
}));
// USER ------------------------------------->
router.post("/addPersonel", verify, (req, res) => __awaiter(this, void 0, void 0, function* () {
    const objContext = {
        reqUserIdVerify: req.user._id,
        reqBodyEmail: req.body.email
    };
    const { error } = validation_1.registerValidation(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);
    const emailExistAdmin = yield mongoose_1.Admin.findOne({ email: req.body.email });
    if (emailExistAdmin)
        return res.status(400).send("Email already exist");
    const emailExist = yield mongoose_1.Admin.findOne({
        personal: { $elemMatch: { email: req.body.email } }
    });
    if (emailExist)
        return res.status(400).send("Email already exist");
    var salt = bcrypt.genSaltSync(10);
    var hashedPasword = bcrypt.hashSync(req.body.password, salt);
    const user = new mongoose_1.User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPasword
    });
    const docAdmin = yield mongoose_1.Admin.findById(objContext.reqUserIdVerify);
    docAdmin.personal.push(user);
    try {
        yield docAdmin.save();
        for (let i = 0; i < docAdmin.personal.length; i++) {
            if (docAdmin.personal[i].email == objContext.reqBodyEmail) {
                res.send(docAdmin.personal);
                console.log("new staff created");
                break;
            }
        }
    }
    catch (err) {
        res.status(400).send(err);
    }
}));
module.exports = router;
