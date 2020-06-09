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
router.get("/getAssignedProjects", verify, (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const adminpersonel = yield mongoose_1.Admin.findOne({
            personal: { $elemMatch: { _id: req.user._id } }
        });
        let myProjectsId = [];
        for (let i = 0; i < adminpersonel.personal.length; i++) {
            if (adminpersonel.personal[i]._id == req.user._id) {
                for (let j = 0; j < adminpersonel.personal[i].assignedProjects.length; j++) {
                    myProjectsId.push(adminpersonel.personal[i].assignedProjects[j].id);
                }
            }
        }
        let myProjectsAssigned = [];
        for (let l = 0; l < myProjectsId.length; l++) {
            for (let i = 0; i < adminpersonel.projects.length; i++) {
                if (adminpersonel.projects[i]._id == myProjectsId[l]) {
                    myProjectsAssigned.push(adminpersonel.projects[i]);
                }
            }
        }
        res.send(myProjectsAssigned);
    }
    catch (err) {
        res.status(400).send(err);
        console.log(err);
    }
}));
router.get("/myDevsForAssignedProjects", verify, (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const adminpersonel = yield mongoose_1.Admin.findOne({
            personal: { $elemMatch: { _id: req.user._id } }
        });
        let myProjectsId = [];
        for (let i = 0; i < adminpersonel.personal.length; i++) {
            if (adminpersonel.personal[i]._id == req.user._id) {
                for (let j = 0; j < adminpersonel.personal[i].assignedProjects.length; j++) {
                    myProjectsId.push(adminpersonel.personal[i].assignedProjects[j].id);
                }
            }
        }
        let devsForThisAssignedProjects = [];
        for (let k = 0; k < myProjectsId.length; k++) {
            for (let i = 0; i < adminpersonel.personal.length; i++) {
                for (let j = 0; j < adminpersonel.personal[i].assignedProjects.length; j++) {
                    if (adminpersonel.personal[i].role == "developer" &&
                        adminpersonel.personal[i].assignedProjects[j].id ==
                            myProjectsId[k]) {
                        devsForThisAssignedProjects.push(adminpersonel.personal[i]);
                    }
                }
            }
        }
        let arrayWithUniqueDevs = [...new Set(devsForThisAssignedProjects)];
        res.send(arrayWithUniqueDevs);
    }
    catch (err) {
        res.status(400).send(err);
    }
}));
module.exports = router;
