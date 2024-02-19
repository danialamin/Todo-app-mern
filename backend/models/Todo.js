const mongoose = require("mongoose")

const taskSchema = new mongoose.Schema({
  text: {type: String, default: 'DEFAULT TEXT'},
  complete: {type: Boolean, default: false},
  timestamp: {type: String, default: Date.now()}
})

module.exports = mongoose.model("todo", taskSchema)