// Schemas

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// User schema
const UserSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
});

// Subtask schema
const SubtaskSchema = new Schema({
    title: { type: String, required: true },
    completed: { type: Boolean, default: false }
});

// Attachment schema
const AttachmentSchema = new Schema({
    filename: { type: String, required: true },
    url: { type: String, required: true }
});

// Task schema
const TaskSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String },
    dueDate: { type: Date },
    priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Low' },
    completed: { type: Boolean, default: false },
    subtasks: [SubtaskSchema],
    collaborators: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    attachments: [AttachmentSchema]
});

// Team schema
const TeamSchema = new Schema({
    name: { type: String, required: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }]
});

// Export models
const User = mongoose.model('User', UserSchema);
const Task = mongoose.model('Task', TaskSchema);
const Team = mongoose.model('Team', TeamSchema);
const Subtask = mongoose.model('Subtask', SubtaskSchema);
const Attachment = mongoose.model('Attachment', AttachmentSchema);

module.exports = {
    User,
    Task,
    Team,
    Subtask,
    Attachment
};



const express = require('express');
const router = express.Router();
const taskController = require('./controllers/taskController');
const teamController = require('./controllers/teamController');
const notificationController = require('./controllers/notificationController');

// Tasks API endpoints
router.post('/tasks', taskController.createTask);
router.put('/tasks/:taskId', taskController.updateTask);
router.get('/tasks', taskController.listTasks);
router.post('/tasks/:taskId/subtasks', taskController.addSubtask);
router.post('/tasks/:taskId/collaborators', taskController.assignCollaborator);
router.post('/tasks/:taskId/attachments', taskController.attachFile);
router.delete('/tasks/:taskId/subtasks', taskController.deleteSubtask);
router.delete('/tasks/:taskId/collaborators', taskController.removeCollaborator);
router.delete('/tasks/:taskId/attachments', taskController.deleteAttachFile);
router.delete('/tasks/:taskId', taskController.deleteTask);

// Teams API endpoints
router.post('/teams', teamController.createTeam);
router.post('/teams/:teamId/members', teamController.addMember);
router.post('/teams/:teamId/tasks', teamController.assignTask);
router.delete('/teams/:teamId/members', teamController.removeMember);
router.delete('/teams/:teamId/tasks', teamController.removeTask);

// Notifications API endpoints
router.post('/notifications/subscribe', notificationController.subscribe);
router.post('/notifications/send', notificationController.sendNotification);

module.exports = router;



// Please Find Answers Here 
// 1.Vertical and horizontal scaling strategies should be considered
// 2.input validation, authentication, update libraries/frameworks. remove if existing or don't use  library that are vulnerable to attacks.
// 3.automated testing and deployment.
// 4.Utilize Server logging
// 5.either Mean or Mern 
