const mongoose = require("mongoose");

const TaskSchema = mongoose.Schema({
  task_name: {
    type: String,
    required: true,
    trim: true,
  },
  state: {
    type: Boolean,
    default: false,
  },

  created_at: {
    type: Date,
    default: Date.now(),
  },
  project_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Projects",
  },
});

module.exports = mongoose.model("Tasks", TaskSchema);
