const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 9000;

app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/todo_app', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Task schema
const taskSchema = new mongoose.Schema({
    name: String,
    assigned_to: {
        type: String,
        enum: ['user1', 'user2', 'user3']
    },
    status: {
        type: String,
        enum: ['Pending', 'InProgress', 'Completed']
    },
    priority: {
        type: String,
        enum: ['High', 'Medium', 'Low']
    },
    due_date: Date,
    comment: String
});

const Task = mongoose.model('Task', taskSchema);

// APIs
app.get('/api/tasks', async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});

app.get('/api/task/:id', async (req, res) => {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).send('Task not found');
    res.json(task);
});

app.post('/api/task', async (req, res) => {
    const newTask = new Task(req.body);
    await newTask.save();
    res.status(201).json(newTask);
});

app.put('/api/task/:id', async (req, res) => {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!task) return res.status(404).send('Task not found');
    res.json(task);
});

app.delete('/api/task/:id', async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.send("Task deleted successfully");
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
