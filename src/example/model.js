const mongoose = require('mongoose');

const ExampleMongoose = mongoose.Schema({
	field: {
		type: String,
		required: false,
	} 
}, { collection: 'example' });

let ExampleModel = mongoose.model('ExampleMongoose', ExampleMongoose);
module.exports = ExampleModel;