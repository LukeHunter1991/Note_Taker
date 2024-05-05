const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');

// POST Route for logging notes
notes.post('/', async (req, res) => {
    // Append data to the db.json file
    const { title, text } = req.body

    if (req.body) {
        const newNote = {
            id: uuidv4(),
            title,
            text
        };
        readAndAppend(newNote, './db/db.json');
        res.json('Note added to log');
    } else {
        res.error('Failed to add note to log');
    }
});

module.exports = notes;