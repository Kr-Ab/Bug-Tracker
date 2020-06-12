"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_controller = __importStar(require("./../routes/admin/personnelRoutes"));
const verify = require("./../auth/verifyToken");
exports.admin_router = express_1.Router();
exports.admin_router.post("/myPersonel", verify, admin_controller.myPersonel);
