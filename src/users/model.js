const mongoose = require('mongoose');

const UsersMongoose = mongoose.Schema({
	name: {
		type: String,
		required: false,
	}, 
	email: {
		type: String,
		required: false,
	}, 
	password: {
		type: String,
		required: false,
	},
	image: {
		type: String,
		required: false,
	},
	facebook_id: {
		type: String,
		required: false,
	},
	google_id: {
		type: String,
		required: false,
	},
	recovery_token: {
		type: String,
		required: false,
	} 
}, { collection: 'users' });

let UsersModel = mongoose.model('UsersMongoose', UsersMongoose);
module.exports = UsersModel;