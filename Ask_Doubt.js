const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {Schema} =mongoose;

const Schema_Doubt=new Schema({
    Text:String,
});
const Doubt=mongoose.model('Doubt',Schema_Doubt,'Doubt');

main().catch(err => console.log(err)); // Fixed logging of the error

async function main() {
    await mongoose.connect("mongodb+srv://yashsavera762:QgYYxYDUN4oCMIot@yashsv.fwwy2.mongodb.net/MyExam");
    console.log('Database Connected');
}

// Ensure proper middleware usage
router.use(express.json()); 
router.use(express.urlencoded({ extended: true }));

router.post('/', async (req, res) => {
    const { Text } = req.body;
    console.log("Doubt received", { Text });

    try {
        const Accepted = await Doubt.create({
            Text: Text,
        });
        return res.status(201).send("Doubt added successfully");
    } catch (error) {
        console.log('Error during placing doubt', error);
        return res.status(500).send('An error occurred during placing doubt');
    }
});

module.exports = router;
