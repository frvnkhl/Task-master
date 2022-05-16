const { Task } = require('../models/Task');
const User = require('../models/User');
const express = require('express');
const passport = require('passport');
const e = require('express');

const router = express.Router();

//task related endpoints
//get all user's information including tasks
router.get('/tasks', (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
        if (err) {
            console.log(err);
        }
        if (info !== undefined) {
            console.log(info.message);
            res.send(info.message);
        } else {
            console.log('user found in db from route');
            res.status(200).send({
                auth: true,
                user: {
                    username: user.username,
                    email: user.email,
                    tasks: user.tasks
                },
                message: 'user found in db'
            });
        }
    })(req, res, next);
});

//create a task
router.post('/tasks/new', (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
        if (err) {
            console.log(err);
        }
        if (info !== undefined) {
            console.log(info.message);
            res.send(info.message);
        } else {
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
                res.status(200).send('Task added successfully');
            } catch (err) {
                res.status(400).send(err);
            }
        }
    })(req, res, next);
});

//edit a specific task
router.patch('/tasks/:id', (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
        if (err) {
            console.log(err);
        }
        if (info !== undefined) {
            console.log(info.message);
            res.send(info.message);
        } else {
            const taskId = req.params.id;
            const partsToUpdate = req.body;
            Object.keys(partsToUpdate).forEach(key => {
                const newKey = `tasks.$.${key}`;
                partsToUpdate[newKey] = partsToUpdate[key];
                delete partsToUpdate[key];
            })

            User.updateOne({ 'tasks._id': taskId }, { $set: partsToUpdate }, (err) => {
                if (!err) {
                    res.status(200).send('task updated successfully');
                } else {
                    res.status(400).send(err);
                }
            })
        }
    })(req, res, next);
});

//delete a specific task
router.delete('/tasks/:id', (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
        if (err) {
            console.log(err);
        }
        if (info !== undefined) {
            console.log(info.message);
            res.send(info.message);
        } else {
            const taskId = req.params.id;
            const user = req.user;

            try {
                const taskToDelete = user.tasks.find(task => task._id === taskId);
                const index = user.tasks.indexOf(taskToDelete);
                user.tasks.splice(index, 1);
                user.save();
                res.status(200).send('task deleted successfully');
            } catch (err) {
                res.status(400).send(err);
            }
        }
    })(req, res, next);
});

    module.exports = router;