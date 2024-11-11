const express = require('express');
const app = express();
const mongoose = require('./mongoose');
const { Paper } = require('./Add_Exam_Paper');
const router = express.Router();
app.use(express.json());

router.get('/exams', async (req, res) => {
    try {
        const currentTime = new Date();
        const exams = await Paper.find({ End_Time: { $lt: currentTime } });
        
        const data = exams.map(exam => ({
            Title: exam.Title,
            Total_Marks: exam.Total_Marks,
            Start_Time: exam.Start_Time,
            End_Time: exam.End_Time,
            Time: exam.Time,
            Instruction: exam.Instruction
        }));

        res.json(data);
    } catch (error) {
        console.error('Error fetching exams:', error);
        res.status(500).json({ message: 'Failed to fetch exams', error: error.message });
    }
});

app.use(router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
