const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { Schema } = mongoose;

// MongoDB Schema Definitions
const Schema_User = new Schema({
    Id: Number,
    Password: String,
    Mail_Id: String,
    Education: String,
});

const Schema_Admin = new Schema({
    Id: Number,
    Password: String,
    Mail_Id: String,
    Experience: String,
});

const Schema_Instructor = new Schema({
    Id: Number,
    Password: String,
    Mail_Id: String,
    Experience: String,
    Exam_Set: Array,
});



const Student = mongoose.model('Student', Schema_User, 'User');
const Admin = mongoose.model('Admin', Schema_Admin, 'Admin');
const Instructor = mongoose.model('Instructor', Schema_Instructor, 'Instructor');

// Database connection
main().catch(err => console.log(err));
async function main() {
    await mongoose.connect("mongodb+srv://yashsavera762:QgYYxYDUN4oCMIot@yashsv.fwwy2.mongodb.net/MyExam");
    console.log('Database Connected');
}

// Middleware to parse incoming requests
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// Secret key for JWT
const SECRET_KEY = 'your_secret_key'; // Replace this with a real secret key

// POST login route
// POST login route
// POST login route
router.post('/login', async (req, res) => {
    const { id, password } = req.body;
    console.log('Form data received:', { id, password });

    try {
        // Check if user is a student
        const user = await Student.findOne({ Id: id, Password: password });
        if (user) {
            console.log("User login");
            return res.json({ role: 'user' }); // Respond with JSON indicating the role
        }

        // Check if user is an admin
        const admin = await Admin.findOne({ Id: id, Password: password });
        if (admin) {
            return res.json({ role: 'admin' }); // Respond with JSON indicating the role
        }

        // Check if user is an instructor
        const instructor = await Instructor.findOne({ Id: id, Password: password });
        if (instructor) {
            return res.json({ role: 'instructor' }); // Respond with JSON indicating the role
        }

        // If no user found
        return res.status(401).json({ message: 'Incorrect ID or Password' });
    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ message: 'An error occurred while processing your request.' });
    }
});



// POST signup route
router.post('/signup', async (req, res) => {
    const { id, password, mail_id, education} = req.body;

    // Validation logic here
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(mail_id)) {
        return res.status(400).send("Invalid email format");
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (!passwordRegex.test(password)) {
        return res.send("Password should be at least 8 characters long, contain at least one lowercase letter, one uppercase letter, one number, and one special character");
    }

    try {
        // Check if the email is already registered
        const exist1 = await Admin.findOne({ Mail_Id: mail_id });
        const exist2 = await Student.findOne({ Mail_Id: mail_id });
        const exist3 = await Instructor.findOne({ Mail_Id: mail_id });
        const exist4=await Admin.findOne({Id:id});
        const exist5=await Student.findOne({Id:id});
        const exist6=await Instructor.findOne({Id:id});
        if (exist1 || exist2 || exist3) {
            return res.status(409).send("Email is already in use");
        }
        if (exist4 || exist5 || exist6) {
            return res.status(409).send("Username is already in use");
        }
        // Create a new student
        const newStudent = await Student.create({
            Id: id,
            Password: password,
            Mail_Id: mail_id,
            Education: education,
        });

        console.log('User registered successfully:', newStudent);
        return res.status(201).send("User registered successfully");
    } catch (error) {
        console.error('Error during signup:', error);
        return res.status(500).send('An error occurred while processing your request.');
    }
});


 module.exports = {
    router,
    Student,
    Instructor,
}