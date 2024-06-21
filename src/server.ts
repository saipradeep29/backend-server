import express, { Request, Response } from 'express';
import fs from 'fs';
import * as path from 'path';

const app = express();
const PORT = 3000;

app.use(express.json());

interface Submission {
    name: string;
    email: string;
    phone: string;
    gitHubLink: string;
    stopwatchTime: number;
}

// Endpoint to check server status
app.get('/ping', (req: Request, res: Response) => {
    res.json({ success: true });
});

// Endpoint to submit a new form submission
app.post('/submit', (req: Request, res: Response) => {
    const submission: Submission = req.body;

    const dbFilePath = path.join(__dirname, '../dist/db.json'); // Adjusted path to dist/db.json
    const data = fs.readFileSync(dbFilePath, 'utf-8');
    const submissions: Submission[] = JSON.parse(data);

    submissions.push(submission);
    fs.writeFileSync(dbFilePath, JSON.stringify(submissions, null, 2), 'utf-8');

    res.status(201).json({ success: true });
});

// Endpoint to read a specific submission
app.get('/read', (req: Request, res: Response) => {
    const index: number = parseInt(req.query.index as string, 10);

    const dbFilePath = path.join(__dirname, '../dist/db.json'); // Adjusted path to dist/db.json
    const data = fs.readFileSync(dbFilePath, 'utf-8');
    const submissions: Submission[] = JSON.parse(data);

    if (index >= 0 && index < submissions.length) {
        res.json(submissions[index]);
    } else {
        res.status(404).json({ error: 'Submission not found' });
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
