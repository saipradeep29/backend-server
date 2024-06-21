"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const path = __importStar(require("path"));
const app = (0, express_1.default)();
const PORT = 3000;
app.use(express_1.default.json());
// Endpoint to check server status
app.get('/ping', (req, res) => {
    res.json({ success: true });
});
// Endpoint to submit a new form submission
app.post('/submit', (req, res) => {
    const submission = req.body;
    const dbFilePath = path.join(__dirname, '../dist/db.json'); // Adjusted path to dist/db.json
    const data = fs_1.default.readFileSync(dbFilePath, 'utf-8');
    const submissions = JSON.parse(data);
    submissions.push(submission);
    fs_1.default.writeFileSync(dbFilePath, JSON.stringify(submissions, null, 2), 'utf-8');
    res.status(201).json({ success: true });
});
// Endpoint to read a specific submission
app.get('/read', (req, res) => {
    const index = parseInt(req.query.index, 10);
    const dbFilePath = path.join(__dirname, '../dist/db.json'); // Adjusted path to dist/db.json
    const data = fs_1.default.readFileSync(dbFilePath, 'utf-8');
    const submissions = JSON.parse(data);
    if (index >= 0 && index < submissions.length) {
        res.json(submissions[index]);
    }
    else {
        res.status(404).json({ error: 'Submission not found' });
    }
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
