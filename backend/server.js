// server.js
require('dotenv').config(); // .env fájl betöltése
const express = require('express');
const cors = require('cors');
const chatRoutes = require('./routes/chatRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware-ek
app.use(cors());          // Engedélyezi a frontend felől érkező kéréseket
app.use(express.json());  // Engedélyezi a beérkező JSON adatok feldolgozását (req.body)

// Route-ok bekötése a globális /api prefix alá
app.use('/api', chatRoutes);

// Szerver indítása
app.listen(PORT, () => {
    console.log(`Szerver fut a következő címen: http://localhost:${PORT}`);
});