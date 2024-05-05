const router = require('express').Router();

// Import modular notes router
const notesRouter = require('./notes');

// Initialise notes route
router.use('/notes', notesRouter);

// export router
module.exports = router;
