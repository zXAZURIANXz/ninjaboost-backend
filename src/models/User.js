
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({

	name  			: { type: String, required: true },
	email 			: { type: String, required: true, unique: true },
	avatar 			: { type: String },
	password 		: { type: String, required: true },
	isVerified 	: { type: Boolean },
	role 				: { type: String },
	lastLogin 	: { type: Date },
	


},{ timestamps: true})

module.exports = mongoose.model('User', UserSchema);