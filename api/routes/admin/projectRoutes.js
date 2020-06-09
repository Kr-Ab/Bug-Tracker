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
router.post("/createProject", verify, (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const objContext = {
            reqUserIdVerify: req.user._id
        };
        const project = new mongoose_1.Project({
            name: req.body.name,
            description: req.body.description
        });
        const docAdmin = yield mongoose_1.Admin.findById(objContext.reqUserIdVerify);
        docAdmin.projects.push(project);
        yield docAdmin.save();
        res.send(docAdmin.projects);
        console.log("project created");
    }
    catch (err) {
        res.status(400).send(err);
    }
}));
router.get("/myProjects", verify, (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const objContext = {
            reqUserIdVerify: req.user._id
        };
        const docAdmin = yield mongoose_1.Admin.findById(objContext.reqUserIdVerify);
        res.send(docAdmin.projects);
        console.log("my project list");
    }
    catch (err) {
        res.status(400).send(err);
    }
}));
router.post("/editProject", verify, (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const objContext = {
            reqUserIdVerify: req.user._id,
            reqBodyName: req.body.name,
            reqBodyDescription: req.body.description,
            reqBodyProjectId: req.body.projectId
        };
        const docAdmin = yield mongoose_1.Admin.findById(objContext.reqUserIdVerify);
        for (let i = 0; i < docAdmin.projects.length; i++) {
            if (docAdmin.projects[i]._id == objContext.reqBodyProjectId) {
                docAdmin.projects[i].name = objContext.reqBodyName;
                docAdmin.projects[i].description = objContext.reqBodyDescription;
                res.status(200).json(docAdmin.projects[i]);
                break;
            }
        }
    }
    catch (err) {
        res.status(400).send(err);
    }
}));
// router.post(
//   "/eliminateTicketsFromProject",
//   verify,
//   async (req: any, res: Response) => {
//     // creatorId: req.body.userId,
//     //projectId
//     //delete //splice(adf,1)
//     Admin.findById(req.user._id, async (err, docAdmin: any) => {
//       try {
//         for (let i = 0; i < docAdmin.projects.length; i++) {
//           if (docAdmin.projects[i]._id == req.body.projectId) {
//             docAdmin.projects[i].name = req.body.name;
//             docAdmin.projects[i].description = req.body.description;
//             res.status(200).json(docAdmin.projects[i]);
//             break;
//           }
//         }
//       } catch (err) {
//         res.status(400).send(err);
//       }
//     });
//   }
// );
router.post("/assignUsersToProject", verify, (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const objContext = {
            reqUserIdVerify: req.user._id,
            reqBodyProjectId: req.body.projectId,
            reqBodyUserId: req.body.userId
        };
        const docAdmin = yield mongoose_1.Admin.findById(objContext.reqUserIdVerify);
        let projectName;
        for (let j = 0; j < docAdmin.projects.length; j++) {
            if (docAdmin.projects[j]._id == objContext.reqBodyProjectId) {
                projectName = docAdmin.projects[j].name;
                break;
            }
        }
        for (let i = 0; i < docAdmin.personal.length; i++) {
            if (docAdmin.personal[i]._id == objContext.reqBodyUserId) {
                try {
                    // bucle para saber si el usario ya se le asigno el proyecto anteriomente y
                    // no hacer nada de ser asi.
                    for (let j = 0; j < docAdmin.personal[i].assignedProjects.length; j++) {
                        if (objContext.reqBodyProjectId ==
                            docAdmin.personal[i].assignedProjects[j].id) {
                            res.send(docAdmin.personal);
                            console.log("repe nothing happen here");
                            return;
                        }
                    }
                    // asignar usuario para el proyecto
                    docAdmin.personal[i].assignedProjects.push({
                        id: objContext.reqBodyProjectId,
                        name: projectName
                    });
                    yield docAdmin.save();
                    res.send(docAdmin.personal);
                    console.log("assigned to project");
                }
                catch (err) {
                    res.status(400).send(err);
                }
                break;
            }
        }
    }
    catch (err) {
        console.log(err);
    }
}));
router.post("/deleteAssignedProject", verify, (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const objContext = {
            reqUserIdVerify: req.user._id,
            reqBodyProjectId: req.body.projectId,
            reqBodyUserId: req.body.userId
        };
        const docAdmin = yield mongoose_1.Admin.findById(objContext.reqUserIdVerify);
        for (let i = 0; i < docAdmin.personal.length; i++) {
            if (docAdmin.personal[i]._id == req.body.personalId) {
                for (let j = 0; docAdmin.personal[i].assignedProjects.length; j++) {
                    if (docAdmin.personal[i].assignedProjects[j].id == req.body.projectId)
                        docAdmin.personal[i].assignedProjects.splice(j, 1);
                    try {
                        yield docAdmin.save();
                        res.send(docAdmin.personal);
                        console.log("removed assignment ");
                    }
                    catch (err) {
                        console.log(err);
                        res.status(400).send(err);
                    }
                    break;
                }
            }
        }
    }
    catch (error) {
        console.log(error);
    }
}));
router.get("/myProjects", verify, (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const objContext = {
            reqUserIdVerify: req.user._id
        };
        const docAdmin = yield mongoose_1.Admin.findById(objContext.reqUserIdVerify);
        res.status(200).json(docAdmin.projects);
    }
    catch (err) {
        res.status(400).send(err);
    }
}));
router.post("/getAssignedPersonelToThisProject", verify, (req, res) => __awaiter(this, void 0, void 0, function* () {
    const objContext = {
        reqUserIdVerify: req.user._id,
        reqBodyProjectId: req.body.projectId
    };
    const docAdmin = yield mongoose_1.Admin.findById(objContext.reqUserIdVerify);
    try {
        const personelToThisProject = [];
        for (let i = 0; i < docAdmin.personal.length; i++) {
            for (let j = 0; j < docAdmin.personal[i].assignedProjects.length; j++) {
                if (docAdmin.personal[i].assignedProjects[j].id ==
                    objContext.reqBodyProjectId) {
                    personelToThisProject.push(docAdmin.personal[i]);
                }
            }
        }
        res.status(200).json(personelToThisProject);
    }
    catch (err) {
        res.status(400).send(err);
    }
}));
router.post("/deleteProjectById", verify, (req, res) => __awaiter(this, void 0, void 0, function* () {
    const objContext = {
        reqUserIdVerify: req.user._id,
        reqBodyProjectId: req.body.projectId
    };
    const docAdmin = yield mongoose_1.Admin.findById(objContext.reqUserIdVerify);
    for (let i = 0; i < docAdmin.projects.length; i++) {
        if (docAdmin.projects[i]._id == objContext.reqBodyProjectId) {
            docAdmin.projects.splice(i, 1);
            try {
                yield docAdmin.save();
                res.send(docAdmin.projects);
                console.log("removed project ");
            }
            catch (err) {
                console.log(err);
                res.status(400).send(err);
            }
            break;
        }
    }
}));
router.post("/deleteAllAssignedProjects", verify, (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const objContext = {
            reqUserIdVerify: req.user._id,
            reqBodyProjectId: req.body.projectId
        };
        const docAdmin = yield mongoose_1.Admin.findById(objContext.reqUserIdVerify);
        for (let i = 0; i < docAdmin.personal.length; i++) {
            for (let j = 0; docAdmin.personal[i].assignedProjects.length; j++) {
                if (docAdmin.personal[i].assignedProjects[j].id == req.body.projectId)
                    docAdmin.personal[i].assignedProjects.splice(j, 1);
                break;
            }
        }
        yield docAdmin.save();
        res.send(docAdmin.personal);
        console.log("removed project");
    }
    catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
}));
module.exports = router;
