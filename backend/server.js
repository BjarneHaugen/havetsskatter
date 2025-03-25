// filepath: backend/server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const app = express();
const PORT = 5000;
const corsOptions = {
    origin: "*",
    credentials: true,
    optionSuccessStatus: 200
};

app.use(bodyParser.json());
app.use(cors(corsOptions));

app.post('/reserve', (req, res) => {
    const reservation = req.body;
    fs.readFile('reservations.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Server error: Error reading reservations.json');
        }
        let reservations = data ? JSON.parse(data) : [];
        reservations.push(reservation);
        fs.writeFile('reservations.json', JSON.stringify(reservations, null, 2), (err) => {
            if (err) {
                return res.status(500).send('Server error: Error writing to reservations.json');
            }
            res.status(200).send('Reservation saved');
        });
    });
});

app.get('/reservations', (req, res) => {
    fs.readFile('reservations.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Server error: Error reading reservations.json');
        }
        let reservations = data ? JSON.parse(data) : [];
        res.status(200).json(reservations);
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});