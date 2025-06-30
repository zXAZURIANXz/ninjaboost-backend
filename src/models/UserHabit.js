const mongoose = require('mongoose');

const UserHabitSchema = new mongoose.Schema({

		title       : {type: String, required: true },
    description : {type: String },
    color       : {type: String },
    isCompleted : {type: Boolean, required: true },
    icon        : {type: String },

})

module.exports = mongoose.model('UserHabit', UserHabitSchema);