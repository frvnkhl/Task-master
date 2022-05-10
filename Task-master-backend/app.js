require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require("passport-local").Strategy;
const { Task } = require(__dirname + '/models/Task.js');
const User = require(__dirname + '/models/User.js');

//app config
const app = express();
const port = process.env.PORT || 6299;

//middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(cors());
app.use((err, req, res, next) => {
    return res.json({ errorMessage: err.message });
});

//db config
mongoose.connect(`mongodb+srv://${process.env.DB_ADMIN}:${process.env.DB_PASSWORD}@cluster0.bxjxi.mongodb.net/TaskMaster?retryWrites=true&w=majority`, { useNewUrlParser: true });


//passport strategies
passport.use(User.createStrategy());
passport.serializeUser((user, done) => {
    done(null, user.id);
});
passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});

//api endpoints
app.get('/', (req, res) => {
    const Users = User.find({});
    res.status(200).send("home");
});

//login & register endpoints 
app.post('/register', (req, res) => {
    const userEmail = req.body.email;
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({ email: userEmail } || { username: username }, (err, user) => {
        if (user) {
            res.status(409).send('User with this email or username already exists');
        } else if (err) {
            res.status(400).send(err);
        } else {
            User.register({ email: userEmail, username: username }, password, (err, user) => {
                if (err) {
                    res.status(400).send(err);
                } else {
                    passport.authenticate('local')(req, res, () => {
                        res.redirect('/tasks');
                    })
                }
            })
        }
    })
});

app.post('/login', (req, res) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password
    });

    req.login(user, (err) => {
        if (err) {
            res.status(400).send(err);
        } else {
            passport.authenticate('local')(req, res, () => {
                res.status(200).redirect('/tasks');
            })
        }
    })
})

//task related endpoints
//get all user's information including tasks
app.get('/tasks', (req, res) => {
    if (req.isAuthenticated()) {
        const user = req.user;
        res.status(200).send(user);
    } else {
        res.status(401).redirect('/');
    }
});

//create a task
app.post('/tasks/new', (req, res) => {
    if (req.isAuthenticated()) {
        const user = req.user;
        const taskDescription = req.body.description;
        const status = req.body.status;
        const urgency = req.body.urgency;
        const dueDate = req.body.dueDate;

        try {
            const newTask = new Task({
                description: taskDescription,
                status: status,
                urgency: urgency,
                dueDate: dueDate
            });

            user.tasks.push(newTask);
            user.save();
            res.redirect('/tasks');
        } catch (err) {
            res.status(400).send(err);
        }

    } else {
        res.redirect('/');
    }
});

//edit a specific task
app.patch('/tasks/:id', (req, res) => {
    const taskId = req.params.id;
    const partsToUpdate = req.body;
    Object.keys(partsToUpdate).forEach(key => {
        const newKey = `tasks.$.${key}`;
        partsToUpdate[newKey] = partsToUpdate[key];
        delete partsToUpdate[key];
    })

    if (req.isAuthenticated()) {
        User.updateOne({ 'tasks._id': taskId }, { $set: partsToUpdate }, (err) => {
            if (!err) {
                res.status(200).redirect('/tasks');
            } else {
                res.status(400).send(err);
            }
        })
    } else {
        res.redirect('/');
    }
});

//delete a specific task
app.delete('/tasks/:id', (req, res) => {
    const taskId = req.params.id;
    const user = req.user;

    if (req.isAuthenticated()) {
        try {
            const taskToDelete = user.tasks.find(task => task._id === taskId);
            const index = user.tasks.indexOf(taskToDelete);
            user.tasks.splice(index, 1);
            user.save();
            res.status(200).redirect('/tasks');
        } catch (err) {
            res.status(400).send(err);
        }
    } else {
        res.redirect('/');
    }
});

//listen
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});