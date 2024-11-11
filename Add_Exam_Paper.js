const express = require('express');
const mongoose = require('mongoose');
const { Schema } = mongoose;
const router1 = express.Router();


Schema_Paper = new Schema({
    Title: String,
    Total_Marks: Number,
    Instruction: String,
    Start_Time: { type: Date, required: true }, 
    End_Time: { type: Date, required: true },   
    Time: { type: Number, required: true },     
    Questions: [
        {
            questionType: String,
            questionText: String,
            questionMarks: Number,
            correctAnswer: [Schema.Types.Mixed], 
            range: {
                type: [Number],
                validate: {
                    validator: function(v) {
                        return v == null || v.length === 2;
                    },
                    message: 'Range must be an array with two numbers'
                }
            },
            options: [String],
            isSCQ: Boolean,
            negativeMarking: Boolean,
            negativePercentage: Number
        }
    ]
});

const Paper = mongoose.model('Paper', Schema_Paper, 'Paper');

router1.post('/', async (req, res) => {
    try {
        const { title, totalMarks, instructions, startTime, endTime, duration, questions } = req.body;

        const newPaper = new Paper({
            Title: title,
            Total_Marks: totalMarks,
            Instruction: instructions,
            Start_Time: new Date(startTime),    
            End_Time: new Date(endTime),        
            Time: duration,                     
            Questions: questions                
        });

        await newPaper.save();
        res.status(201).json({ message: 'Exam paper added successfully!' });
    } catch (error) {
        console.error('Error adding exam paper:', error);
        res.status(500).json({ message: 'Failed to add exam paper', error: error.message });
    }
});

module.exports ={router1,
    Paper
};