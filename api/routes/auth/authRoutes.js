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
const mongoose_1 = require("../../config/mongoose");
const validation_1 = require("../../validation/validation");
const router = require("express").Router();
var bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const verify = require("./verifyToken");
// ------------------------LOGIN AND REGISTRO-------------------------->
router.post("/login", (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const objContext = {
            reqBodyEmail: req.body.email,
            reqBodyPassword: req.body.password
        };
        const { error } = validation_1.loginValidation(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }
        const docAdmin = yield mongoose_1.Admin.findOne({ email: objContext.reqBodyEmail });
        console.log(docAdmin);
        if (!docAdmin) {
            try {
                const adminpersonel = yield mongoose_1.Admin.findOne({
                    personal: { $elemMatch: { email: objContext.reqBodyEmail } }
                });
                if (!adminpersonel) {
                    console.log("Email de personal is wrong");
                    return res.status(400).send("Email de personal is wrong");
                }
                console.log(adminpersonel);
                for (let i = 0; i < adminpersonel.personal.length; i++) {
                    if (adminpersonel.personal[i].email == objContext.reqBodyEmail) {
                        const validPassNoAdmin = yield bcrypt.compare(objContext.reqBodyPassword, adminpersonel.personal[i].password);
                        if (!validPassNoAdmin) {
                            return res.status(400).send("Invalid password");
                        }
                        const tokenNoAdmin = jwt.sign({ _id: adminpersonel.personal[i]._id }, process.env.TOKEN_SECRET);
                        res.header("auth-token", tokenNoAdmin).send(tokenNoAdmin);
                        return;
                    }
                }
            }
            catch (error) {
                res.send(error);
                console.log(error);
            }
            res.status(400).send("Email de admin is wrong");
        }
        const validPass = yield bcrypt.compare(objContext.reqBodyPassword, docAdmin.password);
        if (!validPass)
            return res.status(400).send("Invalid password");
        const token = jwt.sign({ _id: docAdmin._id }, process.env.TOKEN_SECRET);
        if (!token)
            return res.status(400).send("Tu token esta raro");
        res.header("auth-token", token).send(token);
    }
    catch (error) {
        // res.send(error);
        console.log(error);
    }
}));
//ADMIN  ------------------------------------->
exports.registerUser = router.post("/register", (req, res) => __awaiter(this, void 0, void 0, function* () {
    const { error } = validation_1.registerValidation(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);
    const emailExist = yield mongoose_1.Admin.findOne({ email: req.body.email });
    if (emailExist)
        return res.status(400).send("Email already exist");
    //  and via gmail.
    const emailExistPersonnel = yield mongoose_1.Admin.findOne({
        personal: { $elemMatch: { email: req.body.email } }
    });
    if (emailExistPersonnel)
        return res.status(400).send("Email already exist");
    var salt = bcrypt.genSaltSync(10);
    var hashedPasword = bcrypt.hashSync(req.body.password, salt);
    const admin = new mongoose_1.Admin({
        name: req.body.name,
        email: req.body.email,
        password: hashedPasword
    });
    try {
        const savedUser = yield admin.save();
        const token = jwt.sign({ _id: savedUser._id }, process.env.TOKEN_SECRET);
        res.header("auth-token", token).send(token);
        console.log("usuario creado");
    }
    catch (err) {
        console.log(err);
        console.log("error al validar al usuario");
        res.status(400).send(err);
    }
}));
module.exports = router;
