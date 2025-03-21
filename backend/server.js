// filepath: backend/server.js
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const PORT = 5000;

app.use(bodyParser.json());

app.post('/reserve', (req, res) => {
    const reservation = req.body;

    // Read the existing reservations from the JSON file
    fs.readFile('reservations.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Server error');
        }

        const reservations = data ? JSON.parse(data) : [];

        // Add the new reservation to the list
        reservations.push(reservation);

        // Save the updated reservations back to the JSON file
        fs.writeFile('reservations.json', JSON.stringify(reservations, null, 2), (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Server error');
            }

            res.status(200).send('Reservation saved');
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});