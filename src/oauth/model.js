const mongoose = require('mongoose');

const AuthMongoose = mongoose.Schema({
	token: {
		type: String,
		required: false,
	},
	users_id: {
		type: String,
		required: false,
	},
	is_valid: {
		type: Boolean,
		required: false,
	}
}, { collection: 'tokens' });

let AuthModel = mongoose.model('AuthMongoose', AuthMongoose);
module.exports = AuthModel; 