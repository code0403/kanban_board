const mongoose = require("mongoose")

const TaskSchema = mongoose.Schema({
    title: String,
    description : String,
    status : Object,
    subtask : Array
})

const TaskModel = mongoose.model('task', TaskSchema);

module.exports = { TaskModel };