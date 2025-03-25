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
    console.log('Received reservation:', reservation);

    // Read the existing reservations from the JSON file
    fs.readFile('reservations.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading reservations.json:', err);
            return res.status(500).send('Server error: Error reading reservations.json');
        }

        let reservations;
        try {
            reservations = data ? JSON.parse(data) : [];
        } catch (parseError) {
            console.error('Error parsing reservations.json:', parseError);
            return res.status(500).send('Server error: Error parsing reservations.json');
        }

        console.log('Current reservations:', reservations);

        // Add the new reservation to the list
        reservations.push(reservation);

        // Save the updated reservations back to the JSON file
        fs.writeFile('reservations.json', JSON.stringify(reservations, null, 2), (err) => {
            if (err) {
                console.error('Error writing to reservations.json:', err);
                return res.status(500).send('Server error: Error writing to reservations.json');
            }

            console.log('Reservation saved successfully');
            res.status(200).send('Reservation saved');
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});