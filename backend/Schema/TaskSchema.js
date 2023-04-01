const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    required: false,
  },
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;


