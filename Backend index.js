const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Temporary database
let users = [
    {   name: 'amr khaled',number:'01206117704', score: '0'
         },
    // Add more users here
];

// Admin credentials
const adminUsername = 'abdel_halim hassan';
const adminPassword = 'A_E_H';

// Middleware
app.use(bodyParser.json());

// Authentication middleware
function authenticate(req, res, next) {
    const { username, password } = req.body;
    if (username === adminUsername && password === adminPassword) {
        next(); // Proceed to the next middleware or route handler
    } else {
        res.status(401).json({ error: 'Unauthorized' });
    }
}

// Login route
app.post('/login', authenticate, (req, res) => {
    res.json({ success: true });
});

// User score route
app.get('/score/:name', (req, res) => {
    const { name } = req.params;
    const user = users.find(u => u.name.toLowerCase() === name.toLowerCase());
    if (user) {
        res.json({ name: user.name, score: user.score });
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
