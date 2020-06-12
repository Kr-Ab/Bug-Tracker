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
// GENERAL ROUTES ------------------------------------------------------------>
router.post("/createTicket", verify, (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        let docAdmin = yield mongoose_1.Admin.findById(req.user._id);
        if (!docAdmin) {
            docAdmin = yield mongoose_1.Admin.findOne({
                personal: { $elemMatch: { _id: req.user._id } }
            });
            for (let i = 0; i < docAdmin.projects.length; i++) {
                if (docAdmin.projects[i]._id == req.body.projectId) {
                    const ticket = new mongoose_1.Ticket({
                        name: req.body.name,
                        description: req.body.description,
                        priority: req.body.priority,
                        type: req.body.type,
                        status: "Open",
                        submitter: { id: req.user._id, name: docAdmin.name },
                        createdAt: new Date().toLocaleString(),
                        byProjectName: docAdmin.projects[i].name
                    });
                    docAdmin.projects[i].tickets.push(ticket);
                    yield docAdmin.save();
                    let arrayTicketsCreatedByMe = [];
                    for (let i = 0; i < docAdmin.projects.length; i++) {
                        for (let j = 0; j < docAdmin.projects[i].tickets.length; j++) {
                            if (docAdmin.projects[i].tickets[j].submitter.id == req.user._id) {
                                arrayTicketsCreatedByMe.push(docAdmin.projects[i].tickets[j]);
                            }
                        }
                    }
                    res.send(arrayTicketsCreatedByMe);
                    console.log("created Ticket submitter");
                }
            }
        }
        else {
            for (let i = 0; i < docAdmin.projects.length; i++) {
                if (docAdmin.projects[i]._id == req.body.projectId) {
                    const ticket = new mongoose_1.Ticket({
                        name: req.body.name,
                        description: req.body.description,
                        priority: req.body.priority,
                        type: req.body.type,
                        status: "Open",
                        submitter: { id: req.user._id, name: docAdmin.name },
                        createdAt: new Date().toLocaleString(),
                        byProjectName: docAdmin.projects[i].name
                    });
                    docAdmin.projects[i].tickets.push(ticket);
                    yield docAdmin.save();
                    let arrayTickets = [];
                    for (let i = 0; i < docAdmin.projects.length; i++) {
                        for (let j = 0; j < docAdmin.projects[i].tickets.length; j++) {
                            arrayTickets.push(docAdmin.projects[i].tickets[j]);
                        }
                    }
                    console.log("Created Ticket admin ");
                    res.send(arrayTickets);
                    console.log(arrayTickets);
                }
            }
        }
    }
    catch (err) {
        res.status(400).send(err);
    }
}));
router.post("/updateTicketById", verify, (req, res) => __awaiter(this, void 0, void 0, function* () {
    let docAdmin = yield mongoose_1.Admin.findById(req.user._id);
    if (!docAdmin) {
        docAdmin = yield mongoose_1.Admin.findOne({
            personal: { $elemMatch: { _id: req.user._id } }
        });
        for (let i = 0; i < docAdmin.projects.length; i++) {
            for (let j = 0; j < docAdmin.projects[i].tickets.length; j++) {
                if (docAdmin.projects[i].tickets[j]._id == req.body.ticketId) {
                    docAdmin.projects[i].tickets[j].name = req.body.name;
                    docAdmin.projects[i].tickets[j].description = req.body.description;
                    docAdmin.projects[i].tickets[j].priority = req.body.priority;
                    docAdmin.projects[i].tickets[j].type = req.body.type;
                    docAdmin.projects[i].tickets[j].status = req.body.status;
                    docAdmin.projects[i].tickets[j].updatedAt = new Date().toLocaleString();
                    try {
                        yield docAdmin.save();
                        res.send(docAdmin.projects[i].tickets[j]);
                        console.log("UPDATED Ticket ");
                    }
                    catch (err) {
                        res.status(400).send(err);
                        console.log(err);
                    }
                    return;
                }
            }
        }
    }
    for (let i = 0; i < docAdmin.projects.length; i++) {
        for (let j = 0; j < docAdmin.projects[i].tickets.length; j++) {
            if (docAdmin.projects[i].tickets[j]._id == req.body.ticketId) {
                docAdmin.projects[i].tickets[j].name = req.body.name;
                docAdmin.projects[i].tickets[j].description = req.body.description;
                docAdmin.projects[i].tickets[j].priority = req.body.priority;
                docAdmin.projects[i].tickets[j].type = req.body.type;
                docAdmin.projects[i].tickets[j].status = req.body.status;
                docAdmin.projects[i].tickets[j].updatedAt = new Date().toLocaleString();
                try {
                    yield docAdmin.save();
                    res.send(docAdmin.projects[i].tickets[j]);
                    console.log("UPDATED Ticket ");
                }
                catch (err) {
                    res.status(400).send(err);
                    console.log(err);
                }
                return;
            }
        }
    }
}));
router.post("/getTicketById", verify, (req, res) => __awaiter(this, void 0, void 0, function* () {
    let docAdmin = yield mongoose_1.Admin.findById(req.user._id);
    if (!docAdmin) {
        docAdmin = yield mongoose_1.Admin.findOne({
            personal: { $elemMatch: { _id: req.user._id } }
        });
    }
    for (let i = 0; i < docAdmin.projects.length; i++) {
        for (let j = 0; j < docAdmin.projects[i].tickets.length; j++) {
            if (docAdmin.projects[i].tickets[j]._id == req.body.ticketId) {
                // console.log(docAdmin.projects[i].tickets[j]);
                try {
                    yield docAdmin.save();
                    res.send(docAdmin.projects[i].tickets[j]);
                    console.log("list ticket with id");
                    return;
                }
                catch (err) {
                    res.status(400).send(err);
                }
            }
        }
    }
}));
router.post("/addCommentToTicket", verify, (req, res) => __awaiter(this, void 0, void 0, function* () {
    const comment = new mongoose_1.Comment({
        commenterId: req.body.commenter,
        commenterName: req.body.commenterName,
        message: req.body.message,
        createAt: new Date().toLocaleString()
    });
    let docAdmin = yield mongoose_1.Admin.findById(req.user._id);
    if (!docAdmin) {
        docAdmin = yield mongoose_1.Admin.findOne({
            personal: { $elemMatch: { _id: req.user._id } }
        });
    }
    for (let i = 0; i < docAdmin.projects.length; i++) {
        for (let j = 0; j < docAdmin.projects[i].tickets.length; j++) {
            if (docAdmin.projects[i].tickets[j]._id == req.body.ticketId) {
                docAdmin.projects[i].tickets[j].comments.push(comment);
                try {
                    yield docAdmin.save();
                    res.send(docAdmin.projects[i].tickets[j]);
                    console.log("successfully added comment to ticket");
                    break;
                }
                catch (err) {
                    res.status(400).send(err);
                }
            }
        }
    }
}));
router.post("/addImageToTicket", verify, (req, res) => __awaiter(this, void 0, void 0, function* () {
    let docAdmin = yield mongoose_1.Admin.findById(req.user._id);
    if (!docAdmin) {
        docAdmin = yield mongoose_1.Admin.findOne({
            personal: { $elemMatch: { _id: req.user._id } }
        });
    }
    for (let i = 0; i < docAdmin.projects.length; i++) {
        for (let j = 0; j < docAdmin.projects[i].tickets.length; j++) {
            if (docAdmin.projects[i].tickets[j]._id == req.body.ticketId) {
                docAdmin.projects[i].tickets[j].image.push({
                    url: req.body.url,
                    filename: req.body.filename,
                    imageDescription: req.body.imageDescription,
                    idImageCloud: req.body.id,
                    uploaderName: req.body.uploaderName,
                    uploaderId: req.body.uploaderId,
                    updatedAt: new Date().toLocaleString()
                });
                try {
                    yield docAdmin.save();
                    res.send(docAdmin.projects[i].tickets[j]);
                    console.log("successfully added image to ticket");
                    break;
                }
                catch (err) {
                    res.status(400).send(err);
                }
            }
        }
    }
}));
router.post("/deleteTicketById", verify, (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        let docAdmin = yield mongoose_1.Admin.findById(req.user._id);
        if (!docAdmin) {
            docAdmin = yield mongoose_1.Admin.findOne({
                personal: { $elemMatch: { _id: req.user._id } }
            });
            for (let i = 0; i < docAdmin.projects.length; i++) {
                for (let j = 0; j < docAdmin.projects[i].tickets.length; j++) {
                    if (docAdmin.projects[i].tickets[j]._id == req.body.ticketId) {
                        docAdmin.projects[i].tickets.splice(j, 1);
                        const savedRole = yield docAdmin.save();
                        // ----------------------------method to get assigned tickets-----------------------------------
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
                        // ----------------------------method to get assigned tickets-----------------------------------
                        console.log("removed assignment");
                        break;
                    }
                }
            }
        }
        for (let i = 0; i < docAdmin.projects.length; i++) {
            for (let j = 0; j < docAdmin.projects[i].tickets.length; j++) {
                if (docAdmin.projects[i].tickets[j]._id == req.body.ticketId) {
                    docAdmin.projects[i].tickets.splice(j, 1);
                    const savedRole = yield docAdmin.save();
                    let arrayTickets = [];
                    for (let i = 0; i < savedRole.projects.length; i++) {
                        for (let j = 0; j < savedRole.projects[i].tickets.length; j++) {
                            arrayTickets.push(savedRole.projects[i].tickets[j]);
                        }
                    }
                    res.send(arrayTickets);
                    console.log("removed assignment ");
                    break;
                }
            }
        }
    }
    catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
}));
router.post("/assignTicketToDev", verify, (req, res) => __awaiter(this, void 0, void 0, function* () {
    let docAdmin = yield mongoose_1.Admin.findById(req.user._id);
    if (!docAdmin) {
        docAdmin = yield mongoose_1.Admin.findOne({
            personal: { $elemMatch: { _id: req.user._id } }
        });
        let devName;
        for (let k = 0; k < docAdmin.personal.length; k++) {
            if (docAdmin.personal[k]._id == req.body.devId) {
                devName = docAdmin.personal[k].name;
                break;
            }
        }
        for (let i = 0; i < docAdmin.projects.length; i++) {
            for (let j = 0; j < docAdmin.projects[i].tickets.length; j++) {
                if (docAdmin.projects[i].tickets[j]._id == req.body.ticketId) {
                    try {
                        //////////////Add Histoy ///////////////////////
                        let oldDevName;
                        if (docAdmin.projects[i].tickets[j]["assignedDeveloper"]) {
                            oldDevName =
                                docAdmin.projects[i].tickets[j]["assignedDeveloper"]["devName"];
                        }
                        else {
                            oldDevName = "";
                        }
                        const history = new mongoose_1.History({
                            property: "Developer Ticket Assignment",
                            oldValue: oldDevName,
                            newValue: devName,
                            dateChange: new Date().toLocaleString(),
                            metaData: [
                                docAdmin.projects[i].tickets[j]["assignedDeveloper"],
                                { devId: req.body.devId, devName: devName }
                            ]
                        });
                        // console.log(history);
                        docAdmin.projects[i].tickets[j].historial.push(history);
                        yield docAdmin.save();
                        // console.log(docAdmin);
                        //////////////Add History ///////////////////////
                        docAdmin.projects[i].tickets[j]["assignedDeveloper"] = {
                            devId: req.body.devId,
                            devName: devName
                        };
                        // const savedUser = await docAdmin.save();
                        yield docAdmin.save();
                        // ----------------------------method to get assigned tickets -----------------------------------
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
                            console.log("sent the assigned tickets");
                            res.send(myTicketsAssigned);
                        }
                        catch (err) {
                            res.status(400).send(err);
                            console.log(err);
                        }
                        // ----------------------------method to get assigned tickets -----------------------------------
                        console.log("sent list of assigned projects");
                        return;
                    }
                    catch (err) {
                        res.status(400).send(err);
                    }
                }
                break;
            }
        }
    }
    // finding new dev name
    let devName;
    for (let k = 0; k < docAdmin.personal.length; k++) {
        if (docAdmin.personal[k]._id == req.body.devId) {
            devName = docAdmin.personal[k].name;
            break;
        }
    }
    for (let i = 0; i < docAdmin.projects.length; i++) {
        for (let j = 0; j < docAdmin.projects[i].tickets.length; j++) {
            if (docAdmin.projects[i].tickets[j]._id == req.body.ticketId) {
                try {
                    console.log("keeping history admin");
                    //////////////Add Histoy ///////////////////////
                    let oldDevName;
                    if (docAdmin.projects[i].tickets[j]["assignedDeveloper"]) {
                        oldDevName =
                            docAdmin.projects[i].tickets[j]["assignedDeveloper"]["devName"];
                    }
                    else {
                        oldDevName = "";
                    }
                    const history = new mongoose_1.History({
                        property: "Developer Ticket Assignment",
                        oldValue: oldDevName,
                        newValue: devName,
                        dateChange: new Date().toLocaleString(),
                        metaData: [
                            docAdmin.projects[i].tickets[j]["assignedDeveloper"],
                            { devId: req.body.devId, devName: devName }
                        ]
                    });
                    // console.log(history);
                    docAdmin.projects[i].tickets[j].historial.push(history);
                    yield docAdmin.save();
                    // console.log(docAdmin);
                    //////////////Add History ///////////////////////
                    docAdmin.projects[i].tickets[j]["assignedDeveloper"] = {
                        devId: req.body.devId,
                        devName: devName
                    };
                    const savedUser = yield docAdmin.save();
                    let arrayTickets = [];
                    for (let i = 0; i < savedUser.projects.length; i++) {
                        for (let j = 0; j < savedUser.projects[i].tickets.length; j++) {
                            arrayTickets.push(savedUser.projects[i].tickets[j]);
                        }
                    }
                    res.send(arrayTickets);
                    console.log("ticket list");
                    return;
                }
                catch (err) {
                    console.log(err);
                    res.status(400).send(err);
                }
            }
        }
    }
}));
module.exports = router;
