const mongoose = require('mongoose');

const UserHabitSchema = new mongoose.Schema({

		title       	 : {type: String, required: true },
    description 	 : {type: String },
    color       	 : {type: String },
    isCompleted    : {type: Boolean, required: true },
		completedDates : {type: Array },
    icon         	 : {type: String },

},{ timestamps: true })

module.exports = mongoose.model('UserHabit', UserHabitSchema);