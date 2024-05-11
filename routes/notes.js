const notes = require('express').Router();
const { json } = require('express');
const fs = require('fs/promises');
const { v4: uuidv4 } = require('uuid');

// POST Route for logging notes
notes.post('/', async (req, res) => {
    // Append data to the db.json file
    const { title, text } = req.body

    // When request received, create an object from the title and text data.
    if (req.body) {
        const newNote = {
            // Add a unique id for deleting a specific note.
            id: uuidv4(),
            title,
            text
        };

        // Create empty array to hold note data.
        let currentData = [];

        // Try will fail if no data already in db.json
        try {
            // Read data from db.json into arraay once parsed from JSON.
            currentData = JSON.parse(await fs.readFile('./db/db.json', 'utf-8', (err) => {
                err ? console.error(err) : console.log('file read succesfully')
            })
            );
        } catch (error) {
            console.error(error);
        }
        // Add new note into existing data array.
        currentData.push(newNote);
        // Convert updated array to be stored back into db.
        const noteJson = JSON.stringify(currentData);

        // Write updated array back to db file.
        await fs.writeFile('./db/db.json', noteJson, (err) => {
            err ? console.error(err) : console.log('Succesfully updated file')
        });

        const data = await fs.readFile('./db/db.json', (err) =>
            err ? console.error(err) : console.log('file read succesfully'))

        res.send(data);

    } else {
        // If post request failed, send error response.
        res.send('Failed to add note to log');
    }
});

// Get route for retrieving notes from db.
notes.get('/', async (req, res) => {
    let notes = await fs.readFile('./db/db.json', (err) =>
        err ? console.error(err) : console.log('file read succesfully'))

    res.send(notes);
});



module.exports = notes;