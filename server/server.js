const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/User');
const Challenge = require('./models/Challenge');
const Submission = require('./models/Submission');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/notreallynetworking')
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

app.get('/', (req, res) => {
    res.send('Server is running');
});

app.post('/add-user', async (req, res) => {
    try{
        const newUser = new User(req.body);
        await newUser.save();

        res.send("User added succesfully");
    } catch (error) {
        res.send(error);
    }
});

app.get('/users', async (req, res) => {
    try{
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.send(error);
    }
});

app.post('/add-challenge', async (req, res) => {
    try {
        const newChallenge = new Challenge(req.body);
        await newChallenge.save();

        res.send("Challenge added successfully");
    } catch (error) {
        res.send(error);
    }
});

app.get('/challenges', async (req, res) => {
    try {
        const challenges = await Challenge.find().populate('createdBy');
        res.json(challenges);
    } catch (error) {
        res.send(error);
    }
});

app.post('/submit', async (req, res) => {
    try {
        const newSubmission = new Submission(req.body);
        await newSubmission.save();

        res.send("Submission successful");
    } catch (error) {
        console.log(error);
        res.status(500).send("Error submitting");
    }
});

app.get('/submissions', async (req, res) => {
    try {
        const submissions = await Submission.find()
            .populate('userId')
            .populate('challengeId');

        res.json(submissions);
    } catch (error) {
        res.send(error);
    }
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});