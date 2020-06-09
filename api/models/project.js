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
const ticket_1 = require("./ticket");
exports.projectSchema = new mongoose.Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    tickets: [ticket_1.ticketSchema]
});
