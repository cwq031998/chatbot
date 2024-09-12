const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Serve static files from the current directory
app.use(express.static('.'));

// Handle saving messages
app.post('/save-message', (req, res) => {
    const message = req.body.message;
    const timestamp = new Date().toISOString();
    const logEntry = `${timestamp} - User: ${message}\n`;

    fs.appendFile(path.join(__dirname, 'chat-log.txt'), logEntry, (err) => {
        if (err) {
            console.error('Error saving message:', err);
            res.status(500).json({ reply: 'Sorry, something went wrong.' });
            return;
        }

        // Simulate bot response
        const botReply = 'Received your message: ' + message;
        res.json({ reply: botReply });
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
