const express = require('express');
const mongoose = require('mongoose');
const { Paper } = require('./Add_Exam_Paper');
//import { Paper } from './Add_Exam_Paper';
const cors = require('cors');
const app = express();
const router = express.Router();
app.use(express.json());

mongoose.connect("mongodb+srv://yashsavera762:QgYYxYDUN4oCMIot@yashsv.fwwy2.mongodb.net/MyExam")
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.error("MongoDB connection error:", error));

// Define the route to fetch exams
router.post('/', async (req, res) => {
    try {
        const currentTime = new Date();
        const exams = await Paper.find({ End_Time: { $lt: currentTime } });
        
        const data = exams.map(singleExam => ({
            Title: singleExam.Title,
            Total_Marks: singleExam.Total_Marks,
            Start_Time: singleExam.Start_Time,
            End_Time: singleExam.End_Time,
            Time: singleExam.Time,
            Instruction: singleExam.Instruction
        }));

        res.json(data);
    } catch (error) {
        console.error('Error fetching exams:', error);
        res.status(500).json({ message: 'Failed to fetch exams', error: error.message });
    }
});




module.exports=router;