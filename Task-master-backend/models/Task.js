const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    description: String,
    status: {
        type: String,
        enum: ['new', 'in progress', 'completed', 'canceled'],
        default: 'new'
    },
    urgency: {
        type: Number,
        min: 1,
        max: 5,
        default: 3
    },
    dueDate: Date
});

const Task = mongoose.model('Task', taskSchema);

module.exports = {
    Task,
    taskSchema
}