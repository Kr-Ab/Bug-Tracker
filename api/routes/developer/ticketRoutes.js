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
router.get("/getTicketsByAssignedManager", verify, (req, res) => __awaiter(this, void 0, void 0, function* () {
    const objContext = {
        reqUserIdVerify: req.user._id
    };
    const adminpersonel = yield mongoose_1.Admin.findOne({
        personal: { $elemMatch: { _id: objContext.reqUserIdVerify } }
    });
    try {
        let myTicketsAssigned = [];
        for (let i = 0; i < adminpersonel.projects.length; i++) {
            for (let j = 0; j < adminpersonel.projects[i].tickets.length; j++) {
                if (adminpersonel.projects[i].tickets[j].assignedDeveloper) {
                    if (adminpersonel.projects[i].tickets[j].assignedDeveloper.devId ===
                        objContext.reqUserIdVerify) {
                        myTicketsAssigned.push(adminpersonel.projects[i].tickets[j]);
                    }
                }
            }
        }
        res.send(myTicketsAssigned);
    }
    catch (err) {
        res.status(400).send(err);
        console.log(err);
    }
}));
router.post("/updateTicketStatusByDev", verify, (req, res) => __awaiter(this, void 0, void 0, function* () {
    let docData = yield mongoose_1.Admin.findOne({
        personal: { $elemMatch: { _id: req.user._id } }
    });
    for (let i = 0; i < docData.projects.length; i++) {
        for (let j = 0; j < docData.projects[i].tickets.length; j++) {
            if (docData.projects[i].tickets[j]._id == req.body.ticketId) {
                //////////////Add Histoy ///////////////////////
                const history = new mongoose_1.History({
                    property: "Change Status ",
                    oldValue: docData.projects[i].tickets[j].status,
                    newValue: req.body.status,
                    dateChange: new Date().toLocaleString(),
                    metaData: [{ devId: req.user._id }]
                });
                // console.log(history);
                docData.projects[i].tickets[j].historial.push(history);
                yield docData.save();
                // console.log(docAdmin);
                //////////////Add History ///////////////////////
                docData.projects[i].tickets[j].status = req.body.status;
                try {
                    yield docData.save();
                    res.send(docData.projects[i].tickets[j]);
                    console.log("project created");
                }
                catch (err) {
                    res.status(400).send(err);
                }
            }
        }
    }
}));
module.exports = router;
