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
router.get("/getTicketsByAssignedProjects", verify, (req, res) => __awaiter(this, void 0, void 0, function* () {
    const docAdmin = yield mongoose_1.Admin.findOne({
        personal: { $elemMatch: { _id: req.user._id } }
    });
    try {
        let myProjectsId = [];
        for (let i = 0; i < docAdmin.personal.length; i++) {
            if (docAdmin.personal[i]._id == req.user._id) {
                for (let j = 0; j < docAdmin.personal[i].assignedProjects.length; j++) {
                    myProjectsId.push(docAdmin.personal[i].assignedProjects[j].id);
                }
            }
        }
        let myTicketsAssigned = [];
        for (let k = 0; k < myProjectsId.length; k++) {
            for (let i = 0; i < docAdmin.projects.length; i++) {
                if (docAdmin.projects[i]._id == myProjectsId[k]) {
                    for (let j = 0; j < docAdmin.projects[i].tickets.length; j++) {
                        myTicketsAssigned.push(docAdmin.projects[i].tickets[j]);
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
module.exports = router;
