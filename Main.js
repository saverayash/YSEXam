const express = require('express');
const path = require('path');
const {router}= require('./login.js');
const passwordChangeRoutes = require('./passwordchange.js');
//const Privious_ExamRoutes = require('./Privious_Exams.js');
const Ask_DoubtRoutes=require('./Ask_Doubt.js');
const Add_AnotherRoutes=require('./Add_Another.js');
const cors = require('cors');

const app = express();

// Allow all origins (use cautiously in production)
app.use(cors());

// Middleware to parse incoming requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mount routes
app.use('/', router);
app.use('/change', passwordChangeRoutes);
//app.use('/exams', Privious_ExamRoutes);
app.use('/ask',Ask_DoubtRoutes);
app.use('/add',Add_AnotherRoutes);
// Catch-all to send a response for any unmatched routes
app.get('*', (req, res) => {
    res.status(404).send('Not Found');
});

// Start the server on a default port
const PORT = process.env.PORT || 3000; // This uses the environment variable or falls back to 3000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
