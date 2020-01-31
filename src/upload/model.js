const mongoose = require('mongoose');

const UploadMongoose = mongoose.Schema({
	source: {
		type: String,
		required: false,
	},
	created_at: {
		type: Number,
		required: false,
	}
}, { collection: 'upload' });

let UploadModel = mongoose.model('UploadMongoose', UploadMongoose);

module.exports = UploadModel;


