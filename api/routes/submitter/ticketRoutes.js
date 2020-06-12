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
router.get("/getTicketsCreatedBySubmitter", verify, (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const data = yield mongoose_1.Admin.findOne({
            personal: { $elemMatch: { _id: req.user._id } }
        });
        let myTickets = [];
        for (let i = 0; i < data.projects.length; i++) {
            for (let j = 0; j < data.projects[i].tickets.length; j++) {
                if (data.projects[i].tickets[j].submitter.id == req.user._id) {
                    myTickets.push(data.projects[i].tickets[j]);
                }
            }
        }
        res.send(myTickets);
        console.log("get tickets created by submitter ");
    }
    catch (err) {
        res.status(400).send(err);
    }
    return;
}));
module.exports = router;
