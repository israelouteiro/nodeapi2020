const CompaniesModel = require('./model');
const Utils = require('./../../utils/utils')

const utils = new Utils()

class CompaniesService {

	save(req){
		let { company_name, cnpj, zip_code, address_street, address_city, address_state, address_number, address_complement, amount_horses, amount_trucks, observations, email, phone } = req.body;  
 
		let users_id =  req.user.id

		let _pay = { company_name, cnpj, zip_code, address_street, address_city, address_state, address_number, address_complement, amount_horses, amount_trucks, observations, email, phone, users_id }
		return new Promise((resolve, reject) => {  
			new CompaniesModel( _pay ).save((err, doc) => {
	            if(err){ reject({ success: false, err }); return; }
                resolve({ success: true, inserted_id: doc._id });
			})  
		}) 
	}

	read(req){ 
		let users_id =  req.user.id
		let _id = req.params.id;  
		return new Promise((resolve, reject) => {   
			CompaniesModel.findOne({ _id, users_id }, (err, result) => { 
	            if(err){ reject({ success: false, err }); return; }
                resolve({ success: true, register: result });
			})  
		}) 
	}

	readAll(req){  
		let users_id =  req.user.id
		return new Promise((resolve, reject) => {   
			CompaniesModel.find({ users_id }, (err, result) => { 
	            if(err){ reject({ success: false, err }); return; }
                resolve({ success: true, registers: result });
			})  
		}) 
	}

	update(req){
		let { company_name, cnpj, zip_code, address_street, address_city, address_state, address_number, address_complement, amount_horses, amount_trucks, observations, email, phone } = req.body; 
		let users_id =  req.user.id

		let _pay = { } 

		if( company_name !== undefined ){ _pay['company_name'] = company_name ;}
		if( cnpj !== undefined ){ _pay['cnpj'] = cnpj ;} 
		if( zip_code !== undefined ){ _pay['zip_code'] = zip_code ;} 
		if( address_street !== undefined ){ _pay['address_street'] = address_street ;} 
		if( address_city !== undefined ){ _pay['address_city'] = address_city ;} 
		if( address_state !== undefined ){ _pay['address_state'] = address_state ;} 
		if( address_number !== undefined ){ _pay['address_number'] = address_number ;} 
		if( address_complement !== undefined ){ _pay['address_complement'] = address_complement ;} 
		if( amount_horses !== undefined ){ _pay['amount_horses'] = amount_horses ;} 
		if( amount_trucks !== undefined ){ _pay['amount_trucks'] = amount_trucks ;} 
		if( observations !== undefined ){ _pay['observations'] = observations ;} 
		if( email !== undefined ){ _pay['email'] = email ;} 
		if( phone !== undefined ){ _pay['phone'] = phone ;} 

		return new Promise((resolve, reject) => {  
			CompaniesModel.update({ _id: req.params.id, users_id }, _pay, (err, result) => { 
	            if(err){ reject({ success: false, err }); return; }
                resolve({ success: true, updated: _pay });
			})   
		}) 
	}

	delete(req){
		let _id = req.params.id;  
		let users_id =  req.user.id 
		return new Promise((resolve, reject) => {   
			CompaniesModel.remove({ _id, users_id }, (err, result) => { 
	            if(err){ reject({ success: false, err }); return; }
                resolve({ success: true });
			})  
		}) 
	}

	find(req){
		let { cnpj} = req.body;    
		return new Promise((resolve, reject) => {  
			// Open Thirdy API communication
			resolve({
				success: true,
				company: {
					company_name:'Trucks Wheel', 
					cnpj:'79.906.850/0001-45', 
					zip_code:'012390-000', 
					address_street:'Alameda dos Anjos', 
					address_city:'São Paulo', 
					address_state:'SP', 
					address_number:'123', 
					address_complement:'Torre 2'
				}
			}) 
		}) 
	}

}

module.exports = CompaniesService;