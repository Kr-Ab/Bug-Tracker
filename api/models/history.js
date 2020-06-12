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
exports.historySchema = new mongoose.Schema({
    property: {
        type: String
    },
    oldValue: {
        type: String
    },
    newValue: {
        type: String
    },
    dateChange: {
        type: String
    },
    metaData: {
        type: Array
    }
});
