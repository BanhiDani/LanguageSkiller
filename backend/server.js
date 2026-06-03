
// CommonJS... mert azt mondtad. És mi fegyelmezettek vagyunk.

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const chatRoutes = require('./routes/chat.routes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware-ek
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date() });
});

// Routes
app.use('/api/chat', chatRoutes);

app.listen(PORT, () => {
    console.log(`🚀 Server fut a ${PORT}-as porton`);
});
