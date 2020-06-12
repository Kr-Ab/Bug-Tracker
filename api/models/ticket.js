"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = __importStar(require("mongoose"));
const comment_1 = require("./comment");
const image_1 = require("./image");
const history_1 = require("./history");
exports.ticketSchema = new mongoose.Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    assignedDeveloper: {
        type: Object //Id and Name
    },
    submitter: {
        type: Object //Id and Name
    },
    byProjectName: {
        type: Object
    },
    priority: {
        type: String
    },
    status: {
        type: String
    },
    type: {
        type: String
    },
    comments: [comment_1.commentSchema],
    image: [image_1.imageSchema],
    createdAt: {
        type: String
    },
    updatedAt: {
        type: String
    },
    historial: [history_1.historySchema]
});
