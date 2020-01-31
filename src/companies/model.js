const mongoose = require('mongoose');

const CompaniesMongoose = mongoose.Schema({
	company_name: {
		type: String,
		required: false,
	}, 
	cnpj: {
		type: String,
		required: false,
	}, 
	zip_code: {
		type: String,
		required: false,
	}, 
	address_street: {
		type: String,
		required: false,
	}, 
	address_city: {
		type: String,
		required: false,
	}, 
	address_state: {
		type: String,
		required: false,
	}, 
	address_number: {
		type: String,
		required: false,
	}, 
	address_complement: {
		type: String,
		required: false,
	}, 
	amount_horses: {
		type: String,
		required: false,
	}, 
	amount_trucks: {
		type: String,
		required: false,
	}, 
	observations: {
		type: String,
		required: false,
	}, 
	email: {
		type: String,
		required: false,
	}, 
	phone: {
		type: String,
		required: false,
	}, 
	users_id: {
		type: String,
		required: false,
	} 
}, { collection: 'companies' });

let CompaniesModel = mongoose.model('CompaniesMongoose', CompaniesMongoose);
module.exports = CompaniesModel;