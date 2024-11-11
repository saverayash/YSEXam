const express = require('express');
const path = require('path');
const {router}= require('./login.js');
const passwordChangeRoutes = require('./passwordchange.js');
const Ask_DoubtRoutes=require('./Ask_Doubt.js');
const Add_AnotherRoutes=require('./Add_Another.js');
const {router1}=require('./Add_Exam_Paper.js');
const Add_Exam_PaperRoutes=router1;
//const Check_Examp_PaperRoutes=require('./Check_Exam_Paper.js');
const ExamsRoutes=require('./Exams.js');
const Give_ExamRoutes=require('./Give_Exam.js');
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
app.use('/add_exam_paper',router1);
//app.use('/add_exam_paper',Add_Exam_PaperRoutes);
//app.use('/check_exam_paper',Check_Examp_PaperRoutes);
app.use('/exams',ExamsRoutes);
app.use('/give_exam',Give_ExamRoutes);
app.get('*', (req, res) => {
    res.status(404).send('Not Found');
});

// Start the server on a default port
const PORT = process.env.PORT || 3000; // This uses the environment variable or falls back to 3000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
