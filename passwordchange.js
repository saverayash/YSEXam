const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const secretKey = 'your_secret_key'; 

main().catch(err => console.log(err));
async function main() {
    await mongoose.connect("mongodb+srv://yashsavera762:QgYYxYDUN4oCMIot@yashsv.fwwy2.mongodb.net/MyExam");
    console.log('Database Connected');
}

// Password validation criteria
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

// Change password route
router.post('/',async (req, res) => {
    const { Old_Password, New_Password } = req.body;

    // Check if new password meets the criteria
    if (!passwordRegex.test(New_Password)) {
        return res.status(400).send("Password should be at least 8 characters long, contain at least one lowercase letter, one uppercase letter, one number, and one special character.");
    }  
        if (Old_Password === New_Password) {
            return res.status(400).send('Old and new passwords cannot be the same');
        }

        res.send('Password changed successfully');
});

module.exports = router;
