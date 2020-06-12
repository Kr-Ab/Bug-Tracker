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
const router = require("express").Router();
const verify = require("./../auth/verifyToken");
router.post("/getProjectById", verify, (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const objContext = {
            reqUserIdVerify: req.user._id
        };
        const docAdmin = yield mongoose_1.Admin.findById(objContext.reqUserIdVerify);
        for (let i = 0; i < docAdmin.projects.length; i++) {
            if (docAdmin.projects[i]._id == req.body.projectId) {
                res.status(200).json(docAdmin.projects[i]);
                break;
            }
        }
    }
    catch (err) {
        res.status(400).send(err);
    }
}));
module.exports = router;
